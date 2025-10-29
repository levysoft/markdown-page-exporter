/**
 * Markdown Page Exporter - JavaScript
 * 
 * @package MarkdownPageExporter
 * @license GPL v2 or later
 */

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
    
    // Quick copy: click on button content
    $('.md-copy-quick').on('click', function(e) {
        e.stopPropagation();
        var md = getMarkdown();
        if (md) copyText(md);
    });
    
    // Toggle dropdown: click on arrow
    $('.md-btn-toggle').on('click', function(e) {
        e.stopPropagation();
        $('.md-dropdown').toggleClass('active');
    });
    
    // Close dropdown when clicking outside
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
                showToast('Copied!');
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
            showToast('Copied!');
        } catch(e) {
            showToast('Copy error');
        }
        document.body.removeChild(textarea);
    }
    
    function getMarkdown() {
        if (markdown) return markdown;
        
        if (!turndown) {
            showToast('Loading...');
            return '';
        }
        
        // Use correct title passed from PHP
        var title = '';
        if (typeof mdExporterData !== 'undefined' && mdExporterData.title) {
            title = mdExporterData.title;
        } else {
            // Fallback: search in DOM avoiding logo and site header
            title = $('.entry-title, .post-title, article h1.title, .single-title').first().text() || document.title;
        }
        
        // Find content (try multiple selectors)
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
            showToast('Content not found');
            return '';
        }
        
        // Remove our buttons and other unnecessary elements
        content.find('.md-exporter-buttons, .md-modal, .md-toast, .comments, .comment-respond, .navigation, .post-navigation, script, style').remove();
        
        var html = content.html() || '';
        
        if (!html.trim()) {
            // Fallback: use content passed from PHP
            if (typeof mdExporterData !== 'undefined' && mdExporterData.content) {
                html = mdExporterData.content;
            } else {
                showToast('Empty content');
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
