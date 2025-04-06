document.addEventListener("DOMContentLoaded", function () {
    const botaoIniciar = document.getElementById("botao-iniciar");
    const conteudoPrincipal = document.getElementById("conteudo-principal");    
    const introducao = document.getElementById("introducao");
    const botaoMenu = document.getElementById("botao-menu");
    const menuLateral = document.getElementById("menu-lateral");
    const telaInicial = document.querySelector(".tela-inicial");

    if (botaoIniciar) {
        botaoIniciar.addEventListener("click", function () {
            telaInicial.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
            telaInicial.style.opacity = "0";
            telaInicial.style.transform = "translateY(-20px)";

            setTimeout(() => {
                telaInicial.style.display = "none";
                conteudoPrincipal.style.display = "block";
                conteudoPrincipal.style.opacity = "0";
                conteudoPrincipal.style.transform = "translateY(20px)";
                conteudoPrincipal.style.transition = "opacity 1s ease-out, transform 1s ease-out";

                setTimeout(() => {
                    conteudoPrincipal.style.opacity = "1";
                    conteudoPrincipal.style.transform = "translateY(0)";
                    introducao.style.display = "block"; 
                }, 100);
            }, 800);
        });
    }

  
    if (botaoMenu && menuLateral) {
        botaoMenu.addEventListener("click", function () {
            menuLateral.classList.toggle("menu-aberto");
            telaInicial.classList.toggle("menu-aberto");
        });

        
        document.addEventListener("click", function (event) {
            if (!menuLateral.contains(event.target) && event.target !== botaoMenu) {
                menuLateral.classList.remove("menu-aberto");
                telaInicial.classList.remove("menu-aberto");
            }
        });
    }
});
