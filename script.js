jQuery(document).ready(function($) {
    var turndown = null;
    var markdown = '';
    
    setTimeout(function() {
        if (typeof TurndownService !== 'undefined') {
            turndown = new TurndownService({
                headingStyle: 'atx',
                codeBlockStyle: 'fenced'
            });
        }
    }, 500);
    
    // Quick copy: click sul contenuto del pulsante
    $('.md-copy-quick').on('click', function(e) {
        e.stopPropagation();
        var md = getMarkdown();
        if (md) copyText(md);
    });
    
    // Toggle dropdown: click sulla freccetta
    $('.md-btn-toggle').on('click', function(e) {
        e.stopPropagation();
        $('.md-dropdown').toggleClass('active');
    });
    
    // Chiudi dropdown quando si clicca fuori
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.md-dropdown').length) {
            $('.md-dropdown').removeClass('active');
        }
    });
    
    function showToast(msg) {
        var toast = $('.md-toast');
        toast.text(msg).addClass('show');
        setTimeout(function() {
            toast.removeClass('show');
        }, 2000);
    }
    
    function copyText(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showToast('Copiato!');
            }).catch(function() {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }
    
    function fallbackCopy(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('Copiato!');
        } catch(e) {
            showToast('Errore copia');
        }
        document.body.removeChild(textarea);
    }
    
    function getMarkdown() {
        if (markdown) return markdown;
        
        if (!turndown) {
            showToast('Caricamento...');
            return '';
        }
        
        // Usa il titolo corretto passato da PHP
        var title = '';
        if (typeof mdExporterData !== 'undefined' && mdExporterData.title) {
            title = mdExporterData.title;
        } else {
            // Fallback: cerca nel DOM evitando logo e header del sito
            title = $('.entry-title, .post-title, article h1.title, .single-title').first().text() || document.title;
        }
        
        // Trova il contenuto (prova multipli selettori)
        var content = null;
        var selectors = [
            '.entry-content',
            '.post-content', 
            'article .content',
            '.single-content',
            'article',
            '.post',
            'main article',
            '.content-area article'
        ];
        
        for (var i = 0; i < selectors.length; i++) {
            var el = $(selectors[i]).first();
            if (el.length && el.html().trim()) {
                content = el.clone();
                break;
            }
        }
        
        if (!content || !content.length) {
            showToast('Contenuto non trovato');
            return '';
        }
        
        // Rimuovi i nostri pulsanti e altri elementi non necessari
        content.find('.md-exporter-buttons, .md-modal, .md-toast, .comments, .comment-respond, .navigation, .post-navigation, script, style').remove();
        
        var html = content.html() || '';
        
        if (!html.trim()) {
            // Fallback: usa il contenuto passato da PHP
            if (typeof mdExporterData !== 'undefined' && mdExporterData.content) {
                html = mdExporterData.content;
            } else {
                showToast('Contenuto vuoto');
                return '';
            }
        }
        
        markdown = '# ' + title + '\n\n' + turndown.turndown(html);
        
        return markdown;
    }
    
    $('.md-copy').on('click', function() {
        $('.md-dropdown').removeClass('active');
        var md = getMarkdown();
        if (md) copyText(md);
    });
    
    $('.md-view').on('click', function() {
        $('.md-dropdown').removeClass('active');
        var md = getMarkdown();
        if (md) {
            $('.md-output').text(md);
            $('.md-modal').addClass('active');
        }
    });
    
    $('.md-close, .md-modal').on('click', function(e) {
        if (e.target === this) {
            $('.md-modal').removeClass('active');
        }
    });
    
    $('.md-copy-modal').on('click', function() {
        var md = $('.md-output').text();
        copyText(md);
    });
});
