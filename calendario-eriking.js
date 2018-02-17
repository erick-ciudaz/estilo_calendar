
    // var dir=`<link rel="stylesheet" href="https://rawgit.com/erick-ciudaz/estilo_calendar/master/cal.css">`;
    let new_link=document.createElement("link");
    new_link.rel="stylesheet";
    new_link.type="text/css";
    new_link.href="https://rawgit.com/erick-ciudaz/estilo_calendar/master/cal.css";
    document.getElementsByTagName("head")[0].appendChild(new_link);

    onload=function () {
        
        function $(id) {
           /*funcion para extraer elemntos segun su id*/ 
            return document.getElementById(id);  
        }
                    
        function crear_elemento(tag,id,padre) {
                /**
                 * funcion para crear elemento y agregarlo al DOM
                 * agrega el elemento al ultimo del padre seleciconado
                */
                let element;
                element=document.createElement(tag);
                element.id=id;
                padre.appendChild(element);
                return element; 
        }
        function crear_elemento_c(tag,c,padre) {
                /**
                 * funcion para crear elemento y agregarlo al DOM
                 * agrega el elemento al ultimo del padre seleciconado
                */
                let element;
                element=document.createElement(tag);
                element.className=c;
                padre.appendChild(element);
                return element; 
        }


        var inp = $("eriking-cal");

        var padre=undefined;
        
        /**
         * si existe el elemento se ejecuta el if
        */
        if (inp!=null && inp.type=="text") {

            function Agregar_Eventos(element,min,max,vari) {
                element.addEventListener("keyup",function (e) {
                    if (this.value!="") {
                        
                        if (this.value<min || this.value>max) {
                            this.value=vari;
                        }
                        else
                        {
                            if (this.id==="dia") {
                                dia=this.value;
                                
                            } else if(this.id==="mes") {
                                mes=this.value-1;
                                m_temp=mes;
                                
                            }
                            else if(this.id==="año"){
                                año=this.value;
                                a_temp=año;
                            }
                            actualizar_calendar(año,mes);
                            if (aux_element!=elementos_dias[dia-1]) {
                                aux_element.style.background="white";
                                aux_element.style.color="black";
                            }
                            aux_element=elementos_dias[dia-1];

                            let cad=`${a.value}-${m.value}-${d.value}`;
                            inp.value=cad;
                            
                            
                        }
                    }
                });

                element.addEventListener("focus",function (w) {
                    vari=this.value;
                })

            }
            function actualizar_calendar(añ,me) {
  
                let fech=new Date(añ,me,1);
                let inicio=fech.getDay();
                mes_c.textContent=meses[me]+" "+añ;
                let aux_m=dias_mes[me];


                if(añ%4===0 && me===1 ){aux_m++;}
                
                ajustar_calendario(inicio,aux_m);
                marcar_dia();
            }
            
            function ajustar_calendario(v,dy) {
        
                for (let i = 0; i < vacios.length; i++) {
                    if (i<v) {
                        vacios[i].style.display="block";
                    } else {
                        vacios[i].style.display="none";
                    }
                }

                for (let i = 0; i < elementos_dias.length; i++) {
                    if ((i+1)>dy) {
                        elementos_dias[i].style.display="none";
                    } else {
                        elementos_dias[i].style.display="flex";
                    }
                    
                }
            }

            function marcar_dia() {
                if(mes==m_temp && año==a_temp)
                {
  
                    elementos_dias[dia-1].style.background="red";
                    elementos_dias[dia-1].style.color="white";
                   
                }
                else
                {
                    elementos_dias[dia-1].style.background="white";
                    elementos_dias[dia-1].style.color="black";
                }
            }
            /*
                con gecomputedstyle se extrae las propiedades css del elemento
            */

            let style_inp=window.getComputedStyle(inp);
            let new_back=style_inp.getPropertyValue("background-color");
            let new_color=style_inp.getPropertyValue("color");

            if(new_back!="rgb(255, 255, 255)")
            {
                let style_doc=document.documentElement.style
                style_doc.setProperty("--color-prin",new_back);
                style_doc.setProperty("--text-color",new_color);
            }
            
            
            padre=inp.parentNode;
            inp.type='hidden';
            
            
            var sw=0,
                box,
                d,
                m,
                a,
                btn,
                cont_cal,
                cal;
            var m_temp=mes=new Date().getMonth();/*saca mes*/
            var dia=new Date().getDate();
            /*saca dia*/
            var a_temp=año=new Date().getFullYear();
            let cadenita=`${año}-${mes+1}-${dia}`;
            var val_dia=val_mes=val_año="";
            var dias=new Array("do","lu","ma","mi","ju","vi","sa");
            var meses=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
            var dias_mes=new Array(31,(a_temp%4===0)?(29):(28),31,30,31,30,31,31,30,31,30,31);
            
            inp.value=cadenita;
            box=crear_elemento("div","calendario-eriking",padre);
            d=crear_elemento("input","dia",box);
            m=crear_elemento("input","mes",box);
            a=crear_elemento("input","año",box);
            btn=crear_elemento("input","btn",box);btn.type="submit";btn.value="C";
                d.placeholder="dd";d.size="4";d.value=dia; 
                m.placeholder="mm";m.value=mes+1; 
                a.placeholder="aaaa";a.value=año; 
            cont_cal=crear_elemento("div","cont_cal",box);
           

            cal=crear_elemento("div","view_cal",cont_cal);

            var t_mes=crear_elemento("div","titulo_mes",cal);
            var ant_m=crear_elemento("button","anterior",t_mes);ant_m.textContent="<";
            var muestra_mes=crear_elemento("div","mes_c",t_mes);
            muestra_mes.textContent=meses[mes]+' '+año;

            /*creamos botones de anterior y siguiente mes*/

           
            var sig_m=crear_elemento("button","siguiente",t_mes);sig_m.textContent=">";
            function borrar_animacion() {
                
                // cal.classList.remove("animacion-izq");
                cal.classList.remove("animacion-der");
                
              }
            ant_m.addEventListener("click",function (e) {
               
                cal.classList.add("animacion-der");
            })
            
         
            sig_m.addEventListener("click",function (e) {
  
                cal.classList.add("animacion-izq");               
            })

            cal.addEventListener("animationend",function(event) {
                let nombre_a=event.animationName;

                switch (nombre_a) {
                    case "bajar":
                        this.classList.remove("bajar_cal");
                    break;
                    case "der":
                      
                        this.classList.remove("animacion-der");
                        (m_temp===0)?(a_temp--,m_temp=11):(m_temp--);
                        actualizar_calendar(a_temp,m_temp);
                        this.className+=" regresa-izq";

                        
                        break;
                    case "izq":

                        this.classList.remove("animacion-izq");
                        (m_temp===11)?(a_temp++,m_temp=0):(m_temp++);
                        actualizar_calendar(a_temp,m_temp);
                        this.className+=" regresa-der";
                        break;

                    case "der-r":

                        this.classList.remove("regresa-der");
                        break;

                    case "izq-r":

                        this.classList.remove("regresa-izq");
                        break;
                }
                
                
                
            },false);

            

            var cont_dias=crear_elemento("div","cont_dias",cal);
            // const fecha=new Date(2015,0,1);
            // console.log("el dia q empieza el mes de enero del 2015 es "+dias[fecha.getDay()]);

            for (let i = 0; i < dias.length; i++) {
                let element_dia=crear_elemento_c("div","dia_cal",cont_dias);
                element_dia.textContent=dias[i];
            }
            
            /*colocamos los divs en el lugar correcto del calendario*/


            var fech=new Date(año,mes,1);

            var elementos_dias=new Array();
            var vacios=new Array();


            for (let i = 0; i < 6; i++) {
                vacios[i]=crear_elemento_c("div","vacio",cont_dias);
            }

            for (let i = 0; i < 31; i++) {
                
                elementos_dias[i]=crear_elemento_c("div","dia",cont_dias);
                elementos_dias[i].textContent=i+1;
            }
            /*
                hacemos otra iteracion para antes colocar el auxiliar
            */
            var aux_element=elementos_dias[dia-1];
            for (let i = 0; i < 31; i++) {
                elementos_dias[i].addEventListener("click",function (e) {
                     /*modularizar esto en una funcion*/
                     d.value=dia=this.textContent;
                     m.value=m_temp+1;
                     mes=m_temp;
                     a.value=año=a_temp;
                     let cad=`${año}-${m_temp+1}-${this.textContent}`;
                     inp.value=cad;

                    
                     
                     if(aux_element!=null)
                     {   aux_element.style.background="white";
                         aux_element.style.color="black";
                        }

                    this.style.background="red";
                    this.style.color="white";
                    aux_element=this;
                });
                
            }

            ajustar_calendario(fech.getDay(),dias_mes[m_temp]);/*ponemos como parametro el dia en el que esamos y el mes actual*/

            //cont_dias.removeChild(document.getElementsByClassName("vacio")[0]);

            

                btn.addEventListener("click",function () {
                    if (sw===0) {
                        a_temp=a.value;
                        m_temp=m.value-1;
                        actualizar_calendar(a_temp,m_temp);
                        cal.classList.add("bajar_cal")
                        cont_cal.style.display="block";
                        sw=1;
                    }
                    else
                    {
                        cont_cal.style.display="none";
                        sw=0;
                    }
                });
            
            
            Agregar_Eventos(d,1,31,val_dia);
            Agregar_Eventos(m,1,12,val_mes);
            Agregar_Eventos(a,1,2025,val_año);    
            
        } 
    }
