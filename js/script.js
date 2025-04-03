document.addEventListener("DOMContentLoaded", function () {
    const botaoIniciar = document.getElementById("botao-iniciar");
    const telaInicial = document.getElementById("tela-inicial");
    const telaCarregamento = document.getElementById("tela-carregamento");
    const conteudoPrincipal = document.getElementById("conteudo-principal");
    const botaoMenu = document.getElementById("botao-menu");
    const menuLateral = document.getElementById("menu-lateral");
    const introducao = document.getElementById("introducao");

    if (botaoIniciar) {
        botaoIniciar.addEventListener("click", function () {
            telaInicial.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
            telaInicial.style.opacity = "0";
            telaInicial.style.transform = "translateY(-20px)";

            setTimeout(() => {
                telaInicial.style.display = "none";
                telaCarregamento.style.display = "flex";
                telaCarregamento.style.opacity = "0";
                telaCarregamento.style.transform = "translateY(30px)";
                telaCarregamento.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";

                setTimeout(() => {
                    telaCarregamento.style.opacity = "1";
                    telaCarregamento.style.transform = "translateY(0)";
                }, 100);

                setTimeout(() => {
                    telaCarregamento.style.opacity = "0";
                    telaCarregamento.style.transform = "translateY(-20px)";

                    setTimeout(() => {
                        telaCarregamento.style.display = "none";
                        conteudoPrincipal.style.display = "block";
                        conteudoPrincipal.style.opacity = "0";
                        conteudoPrincipal.style.transform = "translateY(20px)";
                        conteudoPrincipal.style.transition = "opacity 1s ease-out, transform 1s ease-out";

                        setTimeout(() => {
                            conteudoPrincipal.style.opacity = "1";
                            conteudoPrincipal.style.transform = "translateY(0)";
                            introducao.style.display = "block"; // 
                        }, 100);
                    }, 800);
                }, 2000);
            }, 800);
        });
    }

    // menu lateral
    if (botaoMenu && menuLateral) {
        botaoMenu.addEventListener("click", function () {
            menuLateral.classList.toggle("menu-aberto");
        });

        // fecha o menu se clicar fora dele teste
        document.addEventListener("click", function (event) {
            if (!menuLateral.contains(event.target) && event.target !== botaoMenu) {
                menuLateral.classList.remove("menu-aberto");
            }
        });
    }
});
