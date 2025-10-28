# Markdown Page Exporter

Plugin WordPress professionale per esportare i tuoi post in formato Markdown con un solo click.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress](https://img.shields.io/badge/wordpress-5.0%2B-green.svg)
![PHP](https://img.shields.io/badge/php-7.0%2B-purple.svg)
![License](https://img.shields.io/badge/license-GPL%20v2-red.svg)

## 📋 Descrizione

Markdown Page Exporter è un plugin WordPress leggero e potente che ti permette di esportare i tuoi articoli in formato Markdown con un solo click. Perfetto per:

- 🔄 Migrare contenuti verso altre piattaforme
- 📝 Creare backup testuali dei tuoi post
- 🤖 Alimentare sistemi di intelligenza artificiale
- 📚 Archiviare contenuti in formato standard e portabile
- ✍️ Rielaborare i tuoi articoli in editor Markdown

## ✨ Caratteristiche

### Funzionalità Principali

- **Copia Rapida (Quick Copy)**: Un solo click sul pulsante principale per copiare il Markdown negli appunti
- **Visualizzazione Anteprima**: Menu dropdown per visualizzare il Markdown prima di copiarlo
- **Conversione Professionale**: Usa la libreria Turndown 7.2.2 (la più usata e affidabile per HTML→Markdown)
- **Titolo Accurato**: Usa l'API WordPress ufficiale per ottenere sempre il titolo corretto del post
- **Compatibilità Universale**: Funziona con qualsiasi tema WordPress
- **Zero Configurazione**: Installa, attiva e funziona immediatamente

### Elementi Supportati

Il plugin converte correttamente:

- ✅ Titoli (H1 fino H6)
- ✅ Grassetto e corsivo
- ✅ Link (con titoli opzionali)
- ✅ Immagini (con alt text)
- ✅ Liste ordinate e non ordinate (anche annidate)
- ✅ Tabelle complete
- ✅ Citazioni (blockquote, anche annidate)
- ✅ Codice inline e blocchi di codice
- ✅ Linee orizzontali
- ✅ Paragrafi e interruzioni di riga

### Design e UX

- 🎨 **Menu a tendina moderno**: Interfaccia pulita e professionale
- ⚡ **Quick Copy**: Azione principale con un solo click
- 📱 **Responsive**: Perfetto su desktop, tablet e mobile
- 🎯 **Posizionamento ottimale**: Sopra il contenuto, allineato a destra
- 💬 **Feedback visivo**: Toast notifications per confermare le azioni
- 🖱️ **Doppia area di click**: Pulsante principale (copia) + freccetta (menu)

## 🚀 Installazione

### Metodo 1: Caricamento ZIP (Consigliato)

1. Scarica `markdown-page-exporter.zip`
2. Vai su **WordPress Admin** > **Plugin** > **Aggiungi nuovo**
3. Clicca **"Carica plugin"**
4. Seleziona il file ZIP
5. Clicca **"Installa ora"**
6. Clicca **"Attiva"**
7. ✅ Fatto!

### Metodo 2: FTP

1. Estrai `markdown-page-exporter.zip`
2. Carica la cartella `markdown-page-exporter` su `/wp-content/plugins/`
3. Vai su **WordPress Admin** > **Plugin**
4. Attiva **"Markdown Page Exporter Simple"**

## 📖 Utilizzo

### Quick Copy (Uso Rapido)

1. Apri un post sul tuo sito
2. Troverai il pulsante **"Copia Markdown"** in alto a destra
3. **Click sul pulsante** → Markdown copiato negli appunti! ✅
4. Incolla dove vuoi (Ctrl+V / Cmd+V)

### Menu Completo

1. **Click sulla freccetta (▼)** → Si apre il menu con:
   - 📋 **Copia Markdown** (copia negli appunti)
   - 👁️ **Visualizza Markdown** (mostra anteprima in una finestra)

2. Nella finestra di anteprima puoi:
   - Leggere il Markdown formattato
   - Copiarlo con il pulsante "Copia"

## 🎯 Come Funziona

### Architettura del Plugin

```
┌─────────────────────────────────────┐
│  WordPress Post (HTML)              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Plugin PHP (Inserisce pulsanti)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  JavaScript (Raccoglie contenuto)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Turndown Library (Converte)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Markdown Output                     │
└─────────────────────────────────────┘
```

### Dettagli Tecnici

1. **PHP (Backend)**:
   - Inserisce i pulsanti nel contenuto del post tramite filtro `the_content`
   - Passa titolo e contenuto raw a JavaScript con `wp_localize_script`
   - Usa API WordPress ufficiali (`get_the_title()`, `get_the_content()`)

2. **JavaScript (Frontend)**:
   - Cerca il contenuto nella pagina con selettori multipli (compatibilità universale)
   - Fallback automatico al contenuto raw se non trova il DOM
   - Gestisce eventi click sui pulsanti
   - Copia negli appunti con `navigator.clipboard` (con fallback per browser vecchi)

3. **Turndown (Conversione)**:
   - Libreria JavaScript standard per HTML→Markdown
   - Versione 7.2.2 (ultima stabile)
   - Caricata da unpkg CDN
   - Configurazione ottimizzata per WordPress

## 🛠️ Requisiti

### Minimi

- **WordPress**: 5.0 o superiore
- **PHP**: 7.0 o superiore
- **Browser**: Chrome, Firefox, Safari, Edge (versioni recenti)
- **Connessione Internet**: Necessaria per caricare Turndown da CDN

### Consigliati

- **WordPress**: 6.0+
- **PHP**: 8.0+
- **HTTPS**: Per funzionalità clipboard complete

## 📁 Struttura File

```
markdown-simple/
├── markdown-page-exporter.php    # Plugin principale (PHP)
├── style.css                     # Stili per pulsanti e UI
├── script.js                     # Logica JavaScript
└── README.md                     # Questo file
```

**Totale**: 4 file, ~400 righe di codice
**Dimensione**: ~20 KB

## 🎨 Personalizzazione

### Cambiare Colori

Modifica `style.css`:

```css
/* Colore pulsante principale */
.md-btn-main {
    background: white;       /* Colore sfondo */
    border: 1px solid #ddd;  /* Colore bordo */
}

/* Colore hover menu */
.md-dropdown-item:hover {
    background: #f5f5f5;     /* Colore hover */
}
```

### Cambiare Posizione

Modifica `style.css`:

```css
/* Pulsante a sinistra invece che a destra */
.md-exporter-buttons {
    justify-content: flex-start;  /* Invece di flex-end */
}
```

### Opzioni Turndown

Modifica `script.js` (riga ~6):

```javascript
turndown = new TurndownService({
    headingStyle: 'atx',         // o 'setext'
    codeBlockStyle: 'fenced',    // o 'indented'
    bulletListMarker: '*'        // o '-' o '+'
});
```

## 🔍 Risoluzione Problemi

### I pulsanti non appaiono

**Possibili cause:**
- Non sei su un post singolo (funziona solo su `is_single()`)
- Il post non è di tipo "post" (non funziona su pagine o custom post types)
- C'è un conflitto JavaScript (controlla console browser con F12)

**Soluzione:**
1. Verifica di essere su un singolo post (non homepage, non archivi)
2. Apri la console del browser (F12) e cerca errori in rosso
3. Disattiva altri plugin temporaneamente per trovare conflitti

### Il Markdown contiene solo il titolo

**Causa:** Il JavaScript non trova il contenuto del post nel DOM

**Soluzione:**
Il plugin ha un fallback automatico che usa il contenuto raw da PHP. Se vedi solo il titolo:
1. Apri console browser (F12)
2. Cerca messaggi tipo "Contenuto non trovato"
3. Segnalami il tema che usi per aggiungere supporto

### La copia non funziona

**Causa:** API Clipboard bloccata (serve HTTPS su alcuni browser)

**Soluzione:**
1. Usa HTTPS invece di HTTP
2. Il plugin ha un fallback automatico con `document.execCommand`
3. Prova con un browser diverso

### Il menu non si apre

**Causa:** Conflitto JavaScript con altri plugin/temi

**Soluzione:**
1. Apri console (F12) e cerca errori
2. Disattiva altri plugin temporaneamente
3. Ricarica con Ctrl+F5 per svuotare cache

## 🤝 Compatibilità

### Temi Testati

✅ Twenty Twenty-Four
✅ Astra
✅ GeneratePress
✅ OceanWP
✅ Neve
✅ Kadence

### Page Builder

✅ Gutenberg (Editor Blocchi)
⚠️ Elementor (funziona, ma potrebbe richiedere personalizzazione CSS)
⚠️ Divi (funziona, ma potrebbe richiedere personalizzazione CSS)

### Plugin

✅ Yoast SEO
✅ Rank Math
✅ WooCommerce (non interferisce)
✅ Contact Form 7
✅ Jetpack

## 📊 Performance

- **Dimensione plugin**: ~20 KB
- **Librerie esterne**: Turndown (~30 KB da CDN)
- **Caricamento**: ~50 KB totale
- **Impatto performance**: Minimo (carica solo su post singoli)
- **Database queries**: 0 (non usa il database)

## 🔐 Sicurezza

- ✅ Nessun dato salvato nel database
- ✅ Usa funzioni WordPress standard (`wp_enqueue_script`, `plugins_url`)
- ✅ Validazione con `is_single()`, `get_post_type()`
- ✅ Non esegue codice lato server fornito dall'utente
- ✅ Carica librerie da CDN affidabile (unpkg.com)

## 📝 Changelog

### v1.0.0 (2025-10-28)

**Prima release stabile! 🎉**

- ✨ Quick Copy: copia con un solo click
- ✨ Menu dropdown moderno
- ✨ Titolo accurato con API WordPress
- ✨ Conversione con Turndown 7.2.2
- ✨ Posizionamento ottimizzato sopra il contenuto
- ✨ Responsive design
- ✨ Compatibilità universale con temi WordPress
- ✨ Fallback automatico per contenuto
- ✨ Toast notifications
- ✨ Zero configurazione

## 📄 Licenza

GPL v2 or later

Questo plugin è software libero: puoi ridistribuirlo e/o modificarlo secondo i termini della GNU General Public License pubblicata dalla Free Software Foundation, versione 2 della licenza o (a tua scelta) qualsiasi versione successiva.

## 👨‍💻 Autore

Sviluppato con ❤️ per semplificare l'esportazione di contenuti WordPress in Markdown.

## 🌟 Supporto

Se il plugin ti è utile:
- ⭐ Lascia una recensione
- 🐛 Segnala bug
- 💡 Suggerisci nuove funzionalità
- 🤝 Contribuisci al codice

## 🔮 Roadmap Futura

Possibili funzionalità per le prossime versioni:

- [ ] Supporto custom post types
- [ ] Download diretto file .md
- [ ] Batch export (esporta tutti i post)
- [ ] Shortcode per posizionamento manuale
- [ ] Pannello admin per configurazione
- [ ] Supporto per metadati del post (data, autore, categorie)
- [ ] Export automatico al salvataggio
- [ ] Integrazione con servizi cloud (Dropbox, Google Drive)

## 📚 Risorse Utili

- **Turndown Library**: https://github.com/mixmark-io/turndown
- **WordPress Plugin Handbook**: https://developer.wordpress.org/plugins/
- **Markdown Guide**: https://www.markdownguide.org/

---

**Grazie per usare Markdown Page Exporter!** 🚀
