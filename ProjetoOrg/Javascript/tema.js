window.addEventListener("DOMContentLoaded", () => {
    const corSalva = localStorage.getItem("corPrincipal");
    const corEscuraSalva = localStorage.getItem("corPrincipalEscuro");
    
    if (corSalva) {
        document.documentElement.style.setProperty("--CorPrincipal", corSalva);
    }
    
    if (corEscuraSalva) {
        document.documentElement.style.setProperty("--CorPrincipalEscuro", corEscuraSalva);
    }
});