import re

html_file = "/Users/1092620v/Documents/docuphox/Victor Oliveros/index.html"
css_file = "/Users/1092620v/Documents/docuphox/Victor Oliveros/assets/css/style.css"

html_content = open(html_file, 'r', encoding='utf-8').read()

track1 = """                <div class="carousel-content">
                    <div class="tool-item"><img src="https://logo.clearbit.com/figma.com" onerror="this.style.display='none'"><span>Figma</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg" onerror="this.style.display='none'"><span>Adobe XD</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Adobe_Creative_Cloud_rainbow_icon.svg" onerror="this.style.display='none'"><span>Suite Adobe</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/canva.com" onerror="this.style.display='none'"><span>Canva</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/material.io" onerror="this.style.display='none'"><span>Material Design</span></div>
                    <div class="tool-item"><img src="https://media.flaticon.com/dist/min/img/apple-icon-180x180-precomposed.png" onerror="this.src='https://cdn-icons-png.flaticon.com/512/814/814881.png'" style="border-radius:6px"><span>Flaticon</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/freepik.com" onerror="this.style.display='none'"><span>Freepik</span></div>
                    <div class="tool-item"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#ag-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="ag-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#40E0D0"/><stop offset="100%" stop-color="#FF00FF"/></linearGradient></defs><path d="M16 18l6-6-6-6M8 6l-6 6 6 6M12 4v16"/><path d="M12 2a1.5 1.5 0 0 0 1.5 1.5A1.5 1.5 0 0 0 15 2a1.5 1.5 0 0 0-1.5-1.5A1.5 1.5 0 0 0 12 2z" fill="#FF00FF" stroke="none"/></svg><span>Antigravity</span></div>
                    <div class="tool-item"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg><span>Claude Code</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/n8n.io" onerror="this.style.display='none'"><span>n8n</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/perplexity.ai" onerror="this.style.display='none'"><span>Perplexity</span></div>
                    <div class="tool-item"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6c0 1.5 1.5 3 3 3-1.5 0-3 1.5-3 3 0-1.5-1.5-3-3-3 1.5 0 3-1.5 3-3z" fill="#4285F4" stroke="none"/></svg><span>NotebookLM</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/x.ai" onerror="this.style.display='none'"><span>Grok</span></div>
                </div>"""
                
track2 = """                <div class="carousel-content">
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" onerror="this.style.display='none'"><span>Gemini</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/labs.google" onerror="this.style.display='none'"><span>Flow de google labs</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/lexica.art" onerror="this.style.display='none'"><span>Lexicart</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" onerror="this.style.display='none'"><span>ChatGPT</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/maze.co" onerror="this.style.display='none'"><span>Maze</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Forms_2020_Logo.svg" onerror="this.style.display='none'"><span>Google Forms</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/atlassian.com" onerror="this.style.display='none'"><span>Jira</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/asana.com" onerror="this.style.display='none'"><span>Asana</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/trello.com" onerror="this.style.display='none'"><span>Trello</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Tasks_2021_Logo.svg" onerror="this.style.display='none'"><span>Tasks</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" onerror="this.style.display='none'"><span>Teams</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg" onerror="this.style.display='none'"><span>Excel</span></div>
                    <div class="tool-item"><img src="https://logo.clearbit.com/apple.com" onerror="this.style.display='none'"><span>Keynote</span></div>
                    <div class="tool-item"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg" onerror="this.style.display='none'"><span>PowerPoint</span></div>
                </div>"""

# Replace in HTML
html_content = re.sub(
    r'<div class="carousel-track track-left">.*?(?=<!-- Fila 2 -->)',
    f'<div class="carousel-track track-left">\n{track1}\n                <!-- Duplicado para Scroll Infinito -->\n{track1}\n            </div>\n            \n            ',
    html_content, flags=re.DOTALL
)

html_content = re.sub(
    r'<div class="carousel-track track-right">.*?(?=<div class="carousel-track track-left"|<\/div>\s*<\/div>\s*<\/section>)',
    f'<div class="carousel-track track-right">\n{track2}\n                <!-- Duplicado para Scroll Infinito -->\n{track2}\n            </div>\n        ',
    html_content, flags=re.DOTALL
)
open(html_file, 'w', encoding='utf-8').write(html_content)

# Replace in CSS
css_content = open(css_file, 'r', encoding='utf-8').read()
css_content = re.sub(r'filter:\s*grayscale\(100%\);', r'', css_content)
css_content = re.sub(r'filter:\s*grayscale\(0%\);', r'', css_content)
css_content = re.sub(r'opacity:\s*0\.8;', r'opacity: 1;', css_content)

open(css_file, 'w', encoding='utf-8').write(css_content)

print("Replacement complete")

