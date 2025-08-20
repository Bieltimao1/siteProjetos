window.addEventListener("DOMContentLoaded",() => {
    fetch("../../Componentes/header.html")
        .then(res => res.text())
        .then(headerconteudo => {
            document.getElementById("header-container").innerHTML = headerconteudo;

                        
            const botoesCor = document.querySelectorAll(".cores");

            botoesCor.forEach(botao => {
                botao.addEventListener("click", () => {
                    // Pega a cor de fundo do botão clicado
                    let cor = botao.dataset.cor || getComputedStyle(botao).backgroundColor;
                    let corescura = botao.dataset.corescura;;

                    // Aplica como cor principal
                    document.documentElement.style.setProperty("--CorPrincipal", cor);
                    document.documentElement.style.setProperty("--CorPrincipalEscuro", botao.dataset.corescura || corescura);

                    // Salva no localStorage
                    localStorage.setItem("corPrincipal", cor);
                    localStorage.setItem("corPrincipalEscuro", corescura);
                });

            });
        })

    fetch("../../Componentes/sidebar.html")
        .then(res => res.text())
        .then(sidebarconteudo => {
            
            document.getElementById("sidebar-container").innerHTML = sidebarconteudo;
            const btnAbrir = document.getElementById("menuBtn"),
            btnFechar = document.getElementById("fecharBtn"),
            sidebar = document.getElementById("sidebar"),
            overlay = document.getElementById("overlay");


            const abrirSidebar = function(){
                sidebar.classList.add("open");
                overlay.classList.add("active");
            }    

            const fecharSidebar = function(){
                sidebar.classList.remove("open")
                overlay.classList.remove("active")
            }

            btnAbrir.addEventListener("click", abrirSidebar);
            btnFechar.addEventListener("click", fecharSidebar);
            overlay.addEventListener("click", fecharSidebar)

            document.addEventListener("keydown", function(event){
                if (event.key === "Escape"){
                   if(sidebar.classList.contains("open")){
                        btnFechar.click();
                   }
                   else{
                        btnAbrir.click();
                   }
                }

            })
        })


    fetch("../../Componentes/footer.html")
        .then(res => res.text())
        .then(footerconteudo => {
            document.getElementById("footer-container").innerHTML = footerconteudo
        })
    
})


