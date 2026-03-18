// Dados dos links
const linksData = [
    {
        id: 1,
        title: "GitHub",
        url: "https://github.com/AntonioPires03",
        icon: "fab fa-github",
        platform: "github",
        clicks: 0
    },
    {
        id: 2,
        title: "LinkedIn",
        url: "https://linkedin.com/in/seu-usuario",
        icon: "fab fa-linkedin",
        platform: "linkedin",
        clicks: 0
    },
    {
        id: 3,
        title: "Twitter",
        url: "https://twitter.com/seu-usuario",
        icon: "fab fa-twitter",
        platform: "twitter",
        clicks: 0
    },
    {
        id: 4,
        title: "Instagram",
        url: "https://instagram.com/seu-usuario",
        icon: "fab fa-instagram",
        platform: "instagram",
        clicks: 0
    },
    {
        id: 5,
        title: "YouTube",
        url: "https://youtube.com/@seu-canal",
        icon: "fab fa-youtube",
        platform: "youtube",
        clicks: 0
    },
    {
        id: 6,
        title: "WhatsApp",
        url: "https://wa.me/5511999999999",
        icon: "fab fa-whatsapp",
        platform: "whatsapp",
        clicks: 0
    }
];

// Elementos do DOM
const linksContainer = document.getElementById('linksContainer');
const modal = document.getElementById('statsModal');
const closeBtn = document.querySelector('.close');
const linkStats = document.getElementById('linkStats');

// Carregar links salvos do localStorage
function loadLinks() {
    const savedLinks = localStorage.getItem('linksData');
    if (savedLinks) {
        return JSON.parse(savedLinks);
    }
    return linksData;
}

// Salvar links no localStorage
function saveLinks(links) {
    localStorage.setItem('linksData', JSON.stringify(links));
}

// Renderizar links
function renderLinks() {
    const links = loadLinks();
    linksContainer.innerHTML = '';
    
    links.forEach(link => {
        const linkElement = createLinkElement(link);
        linksContainer.appendChild(linkElement);
    });
}

// Criar elemento de link
function createLinkElement(link) {
    const div = document.createElement('a');
    div.href = link.url;
    div.target = '_blank';
    div.rel = 'noopener noreferrer';
    div.className = 'link-item';
    div.setAttribute('data-platform', link.platform);
    div.setAttribute('data-id', link.id);
    
    div.innerHTML = `
        <i class="${link.icon}"></i>
        <div class="link-info">
            <span class="link-title">${link.title}</span>
            <span class="link-stats">${link.clicks} cliques</span>
        </div>
    `;
    
    // Adicionar evento de clique
    div.addEventListener('click', (e) => {
        e.preventDefault();
        handleLinkClick(link.id, link.url);
    });
    
    return div;
}

// Manipular clique no link
function handleLinkClick(linkId, url) {
    // Incrementar contador de cliques
    const links = loadLinks();
    const linkIndex = links.findIndex(l => l.id === linkId);
    
    if (linkIndex !== -1) {
        links[linkIndex].clicks += 1;
        saveLinks(links);
        renderLinks();
        
        // Mostrar estatísticas no modal
        showStats(links[linkIndex]);
    }
    
    // Abrir link em nova aba
    window.open(url, '_blank');
}

// Mostrar estatísticas no modal
function showStats(link) {
    linkStats.innerHTML = `
        <strong>${link.title}</strong><br>
        Total de cliques: ${link.clicks}<br>
        Último acesso: ${new Date().toLocaleString()}
    `;
    modal.style.display = 'block';
}

// Fechar modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Animação de entrada dos links
function animateLinks() {
    const links = document.querySelectorAll('.link-item');
    links.forEach((link, index) => {
        link.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        link.style.opacity = '0';
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderLinks();
    animateLinks();
    
    // Atualizar imagem de perfil (opcional)
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            profileImg.src = 'https://via.placeholder.com/150';
        });
    }
});

// Função para adicionar novo link (exemplo de como expandir)
function addNewLink(title, url, icon, platform) {
    const links = loadLinks();
    const newId = Math.max(...links.map(l => l.id)) + 1;
    
    const newLink = {
        id: newId,
        title: title,
        url: url,
        icon: icon,
        platform: platform,
        clicks: 0
    };
    
    links.push(newLink);
    saveLinks(links);
    renderLinks();
}

// Exportar funções (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addNewLink };
}
// script.js - Para o modal de estatísticas

// Elementos do modal
const modal = document.getElementById('statsModal');
const closeBtn = document.querySelector('.close');
const linkStats = document.getElementById('linkStats');

// Abrir modal ao clicar em qualquer link (opcional)
document.querySelectorAll('.link-item').forEach(link => {
    link.addEventListener('click', (e) => {
        // Não abre o modal se for um link real
        // Só estamos deixando o código pronto caso queira usar
        console.log('Link clicado:', link.querySelector('.link-title').textContent);
    });
});

// Fechar modal
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Função para mostrar estatísticas (use quando quiser)
function showStats(linkName, clicks) {
    if (linkStats) {
        linkStats.innerHTML = `
            <strong>${linkName}</strong><br>
            Total de cliques: ${clicks || 0}<br>
            Último acesso: ${new Date().toLocaleString()}
        `;
        modal.style.display = 'block';
    }
}

// Feedback ao tocar no celular (remove delay)
document.addEventListener('touchstart', function(){}, {passive: true});