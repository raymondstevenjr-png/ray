import json

CYAN = "#00B0F0"; NAVY = "#0A2540"; LIGHT = "#F7F9FB"; WHITE = "#FFFFFF"
FONT = "DM Sans"; SLATE = "#4A5C70"; NEAR_BLACK = "#0F1E2D"

FB_URL = "https://www.facebook.com/Rayfoundationsl"
IG_URL = "https://www.instagram.com/ray.foundation/"
LI_URL = "https://www.linkedin.com/company/ray-foundation/"

def e(s):
    return s.replace('&','&amp;').replace('"','&quot;').replace('<','&lt;').replace('>','&gt;')

# Social icons HTML (entity-encoded for Divi text module)
_icons_html = (
    '<div style="text-align:center;padding:8px 0 4px;">'
    '<a href="' + FB_URL + '" target="_blank" rel="noopener" '
    'style="display:inline-block;margin:0 10px;width:52px;height:52px;'
    'border-radius:50%;background:' + CYAN + ';color:#ffffff;text-align:center;'
    'line-height:52px;font-size:20px;text-decoration:none;">'
    '<i class=\'fa fa-facebook-f\'></i></a>'
    '<a href="' + IG_URL + '" target="_blank" rel="noopener" '
    'style="display:inline-block;margin:0 10px;width:52px;height:52px;'
    'border-radius:50%;background:' + CYAN + ';color:#ffffff;text-align:center;'
    'line-height:52px;font-size:20px;text-decoration:none;">'
    '<i class=\'fa fa-instagram\'></i></a>'
    '<a href="' + LI_URL + '" target="_blank" rel="noopener" '
    'style="display:inline-block;margin:0 10px;width:52px;height:52px;'
    'border-radius:50%;background:' + CYAN + ';color:#ffffff;text-align:center;'
    'line-height:52px;font-size:20px;text-decoration:none;">'
    '<i class=\'fa fa-linkedin-in\'></i></a>'
    '</div>'
)

# Eyebrow label
_eyebrow = (
    '&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"12px","syncVertical":"off","syncHorizontal":"off"}}}}}},"content":{"decoration":{"headingFont":{"h4":{"font":{"desktop":{"value":{"size":"13px","lineHeight":"1.5em","family":"' + FONT + '","weight":"700","style":["uppercase"],"color":"' + CYAN + '","letterSpacing":"2px","textAlign":"center"}}}}}}}}'
    ',"innerContent":{"desktop":{"value":"' + e('<h4 style="text-align:center">Stay Connected</h4>') + '"}},"builderVersion":"5.0.3"} /--&gt;'
)

# Heading
_heading = (
    '&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"16px","syncVertical":"off","syncHorizontal":"off"}}}}}},"content":{"decoration":{"headingFont":{"h2":{"font":{"desktop":{"value":{"family":"' + FONT + '","size":"36px","color":"' + NEAR_BLACK + '","lineHeight":"1.2em","letterSpacing":"-0.02em","textAlign":"center","weight":"700"}},"tablet":{"value":{"size":"28px"}},"phone":{"value":{"size":"24px"}}}}}}}'
    ',"innerContent":{"desktop":{"value":"' + e('<h2 style="text-align:center">Follow Our Journey</h2>') + '"}},"builderVersion":"5.0.3"} /--&gt;'
)

# Subtext
_body = (
    '&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"32px","syncVertical":"off","syncHorizontal":"off"}}}}}},"content":{"decoration":{"bodyFont":{"body":{"font":{"desktop":{"value":{"family":"' + FONT + '","weight":"400","size":"17px","lineHeight":"1.8em","color":"' + SLATE + '","textAlign":"center"}},"phone":{"value":{"size":"15px"}}}}}}}}'
    ',"innerContent":{"desktop":{"value":"' + e('<p style="text-align:center">Join our community on social media for updates, stories, and ways to make a difference.</p>') + '"}},"builderVersion":"5.0.3"} /--&gt;'
)

# Icons module (raw text module with inline HTML)
_icons_mod = (
    '&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"0px","syncVertical":"off","syncHorizontal":"off"}}}}}}}'
    ',"innerContent":{"desktop":{"value":"' + e(_icons_html) + '"}},"builderVersion":"5.0.3"} /--&gt;'
)

# Row + Column wrapper (centered, max-width 600px)
_inner = '\n'.join([_eyebrow, '', _heading, '', _body, '', _icons_mod])

_col = (
    '<!-- wp:divi/column {"module":{"advanced":{"type":{"desktop":{"value":"4_4"}}},"decoration":{"sizing":{"desktop":{"value":{"maxWidth":"600px","alignment":"center"}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
    + _inner + '\n'
    '<!-- /wp:divi/column -->'
)

_row = (
    '<!-- wp:divi/row {"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
    + _col + '\n'
    '<!-- /wp:divi/row -->'
)

SOCIAL_SECTION = (
    '<!-- wp:divi/section {"module":{"meta":{"adminLabel":{"desktop":{"value":"Social Media"}}},"decoration":{"background":{"desktop":{"value":{"color":"' + LIGHT + '"}}},"spacing":{"desktop":{"value":{"padding":{"top":"80px","bottom":"80px","syncVertical":"off","syncHorizontal":"off"}}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
    + _row + '\n'
    '<!-- /wp:divi/section -->'
)

# ─── LOAD PAGES AND INSERT SOCIAL SECTION ────────────────────────────────────
with open('/home/user/ray/pages_to_push.json') as f:
    pages = json.load(f)

updated = []
for page in pages:
    content = page['content']
    # Insert social section just before the CTA section (which is always the last section before closing)
    # Strategy: insert before the last <!-- wp:divi/section ... "CTA" ... --> block
    # Simpler: insert before <!-- /wp:divi/placeholder -->
    marker = '<!-- /wp:divi/placeholder -->'
    if marker in content:
        content = content.replace(marker, SOCIAL_SECTION + '\n' + marker)
    updated.append({'ID': page['ID'], 'title': page['title'], 'content': content})

with open('/home/user/ray/social_pages.json', 'w') as f:
    json.dump(updated, f, ensure_ascii=False)

print(f"Written {len(updated)} pages to social_pages.json")
for p in updated:
    print(f"  ID {p['ID']:4d}  {p['title']:30s}  {len(p['content']):,} chars")
