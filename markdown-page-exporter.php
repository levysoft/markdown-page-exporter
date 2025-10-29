<?php
/**
 * Plugin Name: Markdown Page Exporter
 * Plugin URI: https://github.com/levysoft/markdown-page-exporter
 * Description: Esporta i post in formato Markdown pulito: perfetto per portabilità universale (leggibile da qualsiasi editor) e per alimentare LLM (Large Language Models).
 * Version: 1.0.0
 * Author: Antonio Troise
 * Author URI: https://levysoft.it
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: markdown-page-exporter
 */

/*
Copyright (C) 2025 Antonio Troise

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

if (!defined('ABSPATH')) {
    exit;
}

class Markdown_Page_Exporter_Simple {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_filter('the_content', array($this, 'add_buttons'), 20);
    }
    
    public function enqueue_scripts() {
        if (!is_single() || get_post_type() !== 'post') {
            return;
        }
        
        wp_enqueue_style(
            'md-exporter-css',
            plugins_url('style.css', __FILE__),
            array(),
            '1.0.0'
        );
        
        wp_enqueue_script(
            'turndown-lib',
            'https://unpkg.com/turndown@7.2.2/dist/turndown.js',
            array(),
            '7.2.2',
            true
        );
        
        wp_enqueue_script(
            'md-exporter-js',
            plugins_url('script.js', __FILE__),
            array('jquery', 'turndown-lib'),
            '1.0.0',
            true
        );
        
        // Passa il contenuto a JavaScript come fallback
        global $post;
        if ($post) {
            wp_localize_script('md-exporter-js', 'mdExporterData', array(
                'title' => get_the_title(),
                'content' => $post->post_content
            ));
        }
    }
    
    public function add_buttons($content) {
        if (!is_single() || get_post_type() !== 'post' || !is_main_query() || !in_the_loop()) {
            return $content;
        }
        
        $buttons = '
        <div class="md-exporter-buttons">
            <div class="md-dropdown">
                <button class="md-btn-main">
                    <span class="md-btn-content md-copy-quick">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copia Markdown</span>
                    </span>
                    <span class="md-btn-toggle">
                        <svg class="md-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </span>
                </button>
                <div class="md-dropdown-menu">
                    <button class="md-dropdown-item md-copy">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copia Markdown</span>
                    </button>
                    <button class="md-dropdown-item md-view">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <span>Visualizza Markdown</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="md-modal">
            <div class="md-modal-content">
                <span class="md-close">&times;</span>
                <pre class="md-output"></pre>
                <button class="md-copy-modal">Copia</button>
            </div>
        </div>
        <div class="md-toast"></div>';
        
        return $buttons . $content;
    }
}

new Markdown_Page_Exporter_Simple();
