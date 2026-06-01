import json, sys

# Get SOCIAL_SECTION
exec(open('/home/user/ray/add_social.py').read().split('# ─── LOAD PAGES')[0])

# Homepage content (passed as stdin or hardcoded path)
homepage_content = open('/tmp/homepage_content.txt').read()

FOOTER_MARKER = '<!-- wp:divi/section {"module":{"meta":{"adminLabel":{"desktop":{"value":"Footer"}}}'

if FOOTER_MARKER in homepage_content:
    updated = homepage_content.replace(FOOTER_MARKER, SOCIAL_SECTION + '\n' + FOOTER_MARKER, 1)
    print(f"Inserted social section before footer. Total length: {len(updated):,}")
    with open('/tmp/social_homepage.txt', 'w') as f:
        f.write(updated)
    print("Written to /tmp/social_homepage.txt")
else:
    print("ERROR: Footer marker not found!")
    # Fallback: insert before closing placeholder
    marker = '<!-- /wp:divi/placeholder -->'
    if marker in homepage_content:
        updated = homepage_content.replace(marker, SOCIAL_SECTION + '\n' + marker)
        with open('/tmp/social_homepage.txt', 'w') as f:
            f.write(updated)
        print(f"Inserted before closing placeholder. Length: {len(updated):,}")
