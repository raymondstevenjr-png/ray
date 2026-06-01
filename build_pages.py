import json

CYAN="#00B0F0"; NAVY="#0A2540"; LIGHT="#F7F9FB"; WHITE="#FFFFFF"
NEAR_BLACK="#0F1E2D"; SLATE="#4A5C70"; FONT="DM Sans"
PAYPAL="https://www.paypal.com/ncp/payment/PRTGP6CAQJEMN"
HERO_IMG="https://rayfoundationsl.org/wp-content/uploads/2026/05/Front-Page-pic.jpg"
SCHOOL_IMG="https://rayfoundationsl.org/wp-content/uploads/2026/05/School-project-pic.jpg"

def e(s):
    return s.replace('&','&amp;').replace('"','&quot;').replace('<','&lt;').replace('>','&gt;')

def eyebrow(label, color=None, align="center"):
    c = color or CYAN
    h = '<h4 style="text-align:'+align+'">'+label+'</h4>'
    return ('&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"12px","syncVertical":"off","syncHorizontal":"off"}}}}}},"content":{"decoration":{"headingFont":{"h4":{"font":{"desktop":{"value":{"size":"13px","lineHeight":"1.5em","family":"'+FONT+'","weight":"700","style":["uppercase"],"color":"'+c+'","letterSpacing":"2px","textAlign":"'+align+'"}}}}}}}},"innerContent":{"desktop":{"value":"'+e(h)+'"}},"builderVersion":"5.0.3"} /--&gt;')

def hd(text, tag="h2", size="42px", color=None, align="center", ts="32px", ps="26px", mb="28px"):
    col = color or NEAR_BLACK
    h = '<'+tag+' style="text-align:'+align+'">'+text+'</'+tag+'>'
    return ('&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"'+mb+'","syncVertical":"off","syncHorizontal":"off"}}}}}},"content":{"decoration":{"headingFont":{"'+tag+'":{"font":{"desktop":{"value":{"family":"'+FONT+'","size":"'+size+'","color":"'+col+'","lineHeight":"1.2em","letterSpacing":"-0.02em","textAlign":"'+align+'","weight":"700"}},"tablet":{"value":{"size":"'+ts+'"}},"phone":{"value":{"size":"'+ps+'"}}}}}}}},"innerContent":{"desktop":{"value":"'+e(h)+'"}},"builderVersion":"5.0.3"} /--&gt;')

def bd(text, size="18px", color=None, align="left", mb="20px"):
    col = color or SLATE
    p = '<p style="text-align:'+align+'">'+text+'</p>' if align != "left" else '<p>'+text+'</p>'
    return ('&lt;!-- wp:divi/text {"module":{"decoration":{"spacing":{"desktop":{"value":{"margin":{"bottom":"'+mb+'","syncVertical":"off","syncHorizontal":"off"}}}}}},"content":{"decoration":{"bodyFont":{"body":{"font":{"desktop":{"value":{"family":"'+FONT+'","weight":"400","size":"'+size+'","lineHeight":"1.8em","color":"'+col+'","textAlign":"'+align+'"}},"phone":{"value":{"size":"16px"}}}}}}},"innerContent":{"desktop":{"value":"'+e(p)+'"}},"builderVersion":"5.0.3"} /--&gt;')

def btn(text, url, bg=None, fg=WHITE, align="center", new_tab=False):
    bg = bg or CYAN
    t = '"linkTarget":"on",' if new_tab else ''
    return ('<!-- wp:divi/button {"module":{"decoration":{"spacing":{"desktop":{"value":{"padding":{"top":"16px","right":"36px","bottom":"14px","left":"36px","syncVertical":"off","syncHorizontal":"on"}}}}},"advanced":{"alignment":{"desktop":{"value":"'+align+'"}}}},"button":{"decoration":{"button":{"desktop":{"value":{"enable":"on"}}},"background":{"desktop":{"value":{"color":"'+bg+'","enableColor":"on"}}},"font":{"font":{"desktop":{"value":{"size":"14px","family":"'+FONT+'","weight":"700","style":["uppercase"],"color":"'+fg+'","letterSpacing":"1px"}}}},"border":{"desktop":{"value":{"styles":{"all":{"width":"0px"}},"radius":{"sync":"on","topLeft":"40px","topRight":"40px","bottomRight":"40px","bottomLeft":"40px"}}}}}},"innerContent":{"desktop":{"value":{"linkUrl":"'+url+'",'+t+'"text":"'+text+'"}}}},"builderVersion":"5.0.3"} /-->')

def ghost(text, url, color=None, align="center"):
    c = color or CYAN
    return ('<!-- wp:divi/button {"module":{"decoration":{"spacing":{"desktop":{"value":{"padding":{"top":"14px","right":"32px","bottom":"12px","left":"32px","syncVertical":"off","syncHorizontal":"on"}}}}},"advanced":{"alignment":{"desktop":{"value":"'+align+'"}}}},"button":{"decoration":{"button":{"desktop":{"value":{"enable":"on"}}},"font":{"font":{"desktop":{"value":{"size":"14px","family":"'+FONT+'","weight":"700","style":["uppercase"],"color":"'+c+'","letterSpacing":"1px"}}}},"border":{"desktop":{"value":{"styles":{"all":{"color":"'+c+'","width":"1px"}},"radius":{"sync":"on","topLeft":"40px","topRight":"40px","bottomRight":"40px","bottomLeft":"40px"}}}}}},"innerContent":{"desktop":{"value":{"linkUrl":"'+url+'","text":"'+text+'"}}}},"builderVersion":"5.0.3"} /-->')

def hero_sec(label, ey, title, sub, img=None, op=0.75):
    if img:
        bg='{"gradient":{"enabled":"on","overlaysImage":"on","stops":[{"position":0,"color":"rgba(10,37,64,'+str(op)+')"},{"position":100,"color":"rgba(10,37,64,'+str(op)+')"}]},"image":{"url":"'+img+'","blend":"normal","parallax":{"enabled":"off"}}}'
    else:
        bg='{"color":"'+NAVY+'"}'
    return ('<!-- wp:divi/section {"module":{"meta":{"adminLabel":{"desktop":{"value":"'+label+'"}}},"decoration":{"background":{"desktop":{"value":'+bg+'}},"spacing":{"desktop":{"value":{"padding":{"top":"120px","bottom":"80px","syncVertical":"off","syncHorizontal":"off"}}}},"layout":{"desktop":{"value":{"display":"block"}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
            '<!-- wp:divi/row {"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
            '<!-- wp:divi/column {"module":{"advanced":{"type":{"desktop":{"value":"4_4"}}},"decoration":{"sizing":{"desktop":{"value":{"maxWidth":"800px","alignment":"center"}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
            +eyebrow(ey)+'\n\n'+hd(title,"h1","52px",WHITE,"center","38px","30px","20px")+'\n\n'+bd(sub,"19px","#b0ccd8","center","36px")+'\n\n'+btn("Donate Now",PAYPAL,CYAN,WHITE,"center",True)+'\n'
            '<!-- /wp:divi/column -->\n<!-- /wp:divi/row -->\n<!-- /wp:divi/section -->')

def sec(label, rows, bg=None, pt="90px", pb="90px"):
    bg = bg or WHITE
    return ('<!-- wp:divi/section {"module":{"meta":{"adminLabel":{"desktop":{"value":"'+label+'"}}},"decoration":{"background":{"desktop":{"value":{"color":"'+bg+'"}}},"spacing":{"desktop":{"value":{"padding":{"top":"'+pt+'","bottom":"'+pb+'","syncVertical":"off","syncHorizontal":"off"}}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'+rows+'\n<!-- /wp:divi/section -->')

def crow(inner, mw="820px"):
    return ('<!-- wp:divi/row {"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
            '<!-- wp:divi/column {"module":{"advanced":{"type":{"desktop":{"value":"4_4"}}},"decoration":{"sizing":{"desktop":{"value":{"maxWidth":"'+mw+'","alignment":"center"}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'
            +inner+'\n<!-- /wp:divi/column -->\n<!-- /wp:divi/row -->')

def c2(inner):
    return ('<!-- wp:divi/column {"module":{"advanced":{"type":{"desktop":{"value":"1_2"}}},"decoration":{"background":{"desktop":{"value":{"color":"'+WHITE+'"}}},"spacing":{"desktop":{"value":{"padding":{"top":"40px","right":"40px","bottom":"40px","left":"40px","syncVertical":"on","syncHorizontal":"on"}}}},"border":{"desktop":{"value":{"radius":{"sync":"on","topLeft":"16px","topRight":"16px","bottomRight":"16px","bottomLeft":"16px"}}}},"boxShadow":{"desktop":{"value":{"style":"preset3","vertical":"20px","blur":"50px","spread":"-8px","color":"rgba(0,176,240,0.08)"}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'+inner+'\n<!-- /wp:divi/column -->')

def row2(a, b):
    return ('<!-- wp:divi/row {"module":{"advanced":{"columnStructure":{"desktop":{"value":"1_2,1_2"}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'+c2(a)+c2(b)+'\n<!-- /wp:divi/row -->')

def c3(inner):
    return ('<!-- wp:divi/column {"module":{"advanced":{"type":{"desktop":{"value":"1_3"}}},"decoration":{"background":{"desktop":{"value":{"color":"'+WHITE+'"}}},"spacing":{"desktop":{"value":{"padding":{"top":"36px","right":"32px","bottom":"36px","left":"32px","syncVertical":"on","syncHorizontal":"on"}}}},"border":{"desktop":{"value":{"radius":{"sync":"on","topLeft":"16px","topRight":"16px","bottomRight":"16px","bottomLeft":"16px"}}}},"boxShadow":{"desktop":{"value":{"style":"preset3","vertical":"16px","blur":"40px","spread":"-6px","color":"rgba(0,176,240,0.08)"}}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'+inner+'\n<!-- /wp:divi/column -->')

def row3(a,b,c):
    return ('<!-- wp:divi/row {"module":{"advanced":{"columnStructure":{"desktop":{"value":"1_3,1_3,1_3"}}}},"builderVersion":"5.0.3","modulePreset":["default"]} -->\n'+c3(a)+c3(b)+c3(c)+'\n<!-- /wp:divi/row -->')

def cta(title, sub, btn_text=None, btn_url=None, ghost_text=None, ghost_url=None):
    inner = hd(title,"h2","40px",WHITE,"center","30px","24px")+'\n\n'+bd(sub,"18px","#b0ccd8","center","32px")
    if btn_text: inner += '\n\n'+btn(btn_text, btn_url or PAYPAL, CYAN, WHITE, "center", True)
    if ghost_text: inner += '\n\n'+ghost(ghost_text, ghost_url or "https://rayfoundationsl.org/contact/", CYAN, "center")
    return sec("CTA", crow(inner), NAVY)

# ─── BUILD SCHOOLS ──────────────────────────────────────────────────────────
bs = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Build Schools","A Classroom Changes Everything","In parts of Sierra Leone, the nearest school sits hours away. Children drop out not because they lack ability but because they lack a building to learn in. Ray Foundation builds that building.",SCHOOL_IMG,0.72),
    sec("Why",crow(eyebrow("The Problem")+"\n\n"+hd("No Roof. No School.","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Sierra Leone has one of the lowest school enrollment rates in West Africa. Distance is the main reason children drop out. A girl who lives four miles from the nearest school often stops going by age ten. A boy who walks barefoot through the rainy season often stops going by twelve. We build schools in the communities that need them most, close enough that every child can get there and back before dark.","18px",None,"center","0px")),LIGHT),
    sec("How",
        crow(eyebrow("Our Approach")+"\n\n"+hd("How We Build","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Every school we build starts with the community. We listen first. Local leaders tell us where children are learning under trees or in crumbling rooms. Local workers and families take part in the construction. That is not a program strategy. That is respect.","18px",None,"center","40px"))
        +"\n"+row2(
            eyebrow("Step One",CYAN,"left")+"\n\n"+hd("Community Partnership","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("We meet with community leaders, parents, and teachers to understand the need before a single brick is laid.","16px",None,"left"),
            eyebrow("Step Two",CYAN,"left")+"\n\n"+hd("Local Construction","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("Local workers build every classroom. That keeps money in the community, builds pride in the result, and creates jobs.","16px",None,"left")
        )+"\n"+row2(
            eyebrow("Step Three",CYAN,"left")+"\n\n"+hd("Equip and Staff","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("We work with local government to staff new classrooms with trained teachers and supply desks, chalkboards, and basic materials.","16px",None,"left"),
            eyebrow("Step Four",CYAN,"left")+"\n\n"+hd("Long-Term Support","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("We track enrollment for three years after each build. If a school loses students, we go back and find out why.","16px",None,"left")
        )),
    sec("Impact",crow(eyebrow("Our Numbers")+"\n\n"+hd("What We Have Built So Far","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Seven classrooms. Three communities. Five hundred children who have a place to learn that they did not have before. Sixty percent more students enrolled since we started.","18px",None,"center","32px")+"\n\n"+btn("Help Build the Next School",PAYPAL,CYAN,WHITE,"center",True)),LIGHT),
    cta("Every Dollar Builds Something Real","A classroom costs what a family vacation costs. A desk costs what a dinner out costs. The children in Bo and Kabala will sit in the room your generosity built.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── TEXTBOOKS ──────────────────────────────────────────────────────────────
tb = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Textbooks and Supplies","A Book Is the Cheapest Education You Can Buy","Many children in Sierra Leone go to school every day and come home with nothing to study. Not because they are lazy. Because the school has one textbook for thirty students.",HERO_IMG,0.72),
    sec("Gap",crow(eyebrow("The Problem")+"\n\n"+hd("No Book to Take Home","h2","40px",None,"center","30px","24px")+"\n\n"+bd("A child who cannot study at home is already falling behind. Textbook shortages in rural Sierra Leone are not an exception. They are the rule. In many classrooms we have visited, one text is shared between twenty or thirty students.","18px",None,"center","0px")),LIGHT),
    sec("What",
        crow(eyebrow("What We Do")+"\n\n"+hd("What Ray Foundation Delivers","h2","40px",None,"center","30px","24px")+"\n\n"+bd("We identify the schools and grade levels with the greatest shortfalls. Then we source official Sierra Leone curriculum textbooks, pencils, notebooks, and basic supplies, delivered directly to teachers.","18px",None,"center","40px"))
        +"\n"+row3(
            eyebrow("Core Textbooks",CYAN,"left")+"\n\n"+hd("Curriculum Books","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Mathematics, English, science, and social studies texts aligned to the Sierra Leone national curriculum for primary and junior secondary students.","15px",None,"left"),
            eyebrow("School Supplies",CYAN,"left")+"\n\n"+hd("Notebooks and Pens","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Exercise books, pencils, pens, erasers, and rulers. The basics that every student needs but many arrive at school without.","15px",None,"left"),
            eyebrow("Teacher Materials",CYAN,"left")+"\n\n"+hd("Teacher Guides","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Teacher resource guides and lesson plan materials so the books land in classrooms where they can be used well, not just stored.","15px",None,"left")
        )),
    sec("Impact",crow(eyebrow("Why It Matters")+"\n\n"+hd("What a Book Does","h2","40px",None,"center","30px","24px")+"\n\n"+bd("A student who can take a textbook home studies at night. A student who studies at night passes their exams. A student who passes their exams can go to secondary school. That chain starts with one book.","18px",None,"center","32px")+"\n\n"+btn("Send Books to a Child",PAYPAL,CYAN,WHITE,"center",True)),LIGHT),
    cta("Give a Child Something to Study Tonight","The cost of one textbook is less than a lunch. The impact lasts a school year. For a child who has never had a book of their own, it lasts a lifetime.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── CLEAN WATER ────────────────────────────────────────────────────────────
cw = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Clean Water","Before a Child Can Learn, They Need to Be Well","Children who drink contaminated water miss school. They get sick. They fall behind. Clean water is not a separate project from education. It is the foundation of it.",SCHOOL_IMG,0.72),
    sec("Need",crow(eyebrow("Why Water")+"\n\n"+hd("Water and Education Are the Same Fight","h2","40px",None,"center","30px","24px")+"\n\n"+bd("In rural Sierra Leone, many communities rely on unprotected wells, rivers, and streams. Waterborne illness is one of the leading causes of school absence. A child who is sick cannot learn. A girl who spends two hours carrying water before school often does not arrive on time.","18px",None,"center","0px")),LIGHT),
    sec("What",
        crow(eyebrow("Our Water Program")+"\n\n"+hd("How We Help","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Ray Foundation partners with communities to assess water access and support practical infrastructure improvements, working alongside local engineers and leaders to identify what is needed.","18px",None,"center","40px"))
        +"\n"+row2(
            eyebrow("Boreholes",CYAN,"left")+"\n\n"+hd("Clean Water Sources","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("We support the drilling and maintenance of boreholes and protected wells near schools, so students and families have a clean, close source of water.","15px",None,"left"),
            eyebrow("School Facilities",CYAN,"left")+"\n\n"+hd("Handwashing Stations","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("Basic handwashing stations at school entrances reduce illness and model hygiene habits that children carry home. Installed alongside every classroom build.","15px",None,"left")
        )),
    cta("Clean Water Is Not a Luxury","It is the precondition for everything else we do. When a child has clean water, they come to school. When they come to school, they learn.","Support Clean Water Access",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── MENTORSHIP ─────────────────────────────────────────────────────────────
mn = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Mentorship","A Child Who Is Seen Will Go Further","Buildings and books are not enough. Children need someone who believes in them, who shows up, who says: your future is real and I am going to help you get there.",HERO_IMG,0.72),
    sec("Why",crow(eyebrow("The Need")+"\n\n"+hd("More Than a Classroom","h2","40px",None,"center","30px","24px")+"\n\n"+bd("In communities recovering from decades of conflict and poverty, many children grow up without adult role models who have walked the road they want to walk. Ray Foundation mentorship closes that gap.","18px",None,"center","0px")),LIGHT),
    sec("Program",
        crow(eyebrow("How It Works")+"\n\n"+hd("What Our Mentorship Program Does","h2","40px",None,"center","30px","24px")+"\n\n"+bd("We connect students with mentors, both locally based community leaders and diaspora volunteers who hold video sessions monthly. The focus is practical: career awareness, exam preparation, and confidence.","18px",None,"center","40px"))
        +"\n"+row3(
            eyebrow("One on One",CYAN,"left")+"\n\n"+hd("Personal Guidance","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Each mentee is matched with a mentor based on interest and background. They meet monthly to set goals, review progress, and talk through challenges.","15px",None,"left"),
            eyebrow("Group Workshops",CYAN,"left")+"\n\n"+hd("Confidence Building","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Sessions on public speaking, study habits, goal setting, and understanding what life after school can look like, taught by people who have lived it.","15px",None,"left"),
            eyebrow("Exam Preparation",CYAN,"left")+"\n\n"+hd("Academic Support","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Targeted support in the weeks before national exams. Mentors guide students through revision and manage exam anxiety.","15px",None,"left")
        )),
    sec("Volunteer",crow(eyebrow("Get Involved")+"\n\n"+hd("Become a Mentor","h2","40px",None,"center","30px","24px")+"\n\n"+bd("You do not have to be in Sierra Leone. You need one hour a month, a video call, and a genuine belief that the child on the other side deserves your time.","18px",None,"center","32px")+"\n\n"+ghost("Contact Us to Volunteer","https://rayfoundationsl.org/contact/",CYAN,"center")),LIGHT),
    cta("Your Story Could Change Theirs","The most powerful thing a mentor gives a child is proof: proof that someone from a hard place can build something beautiful.","Support the Mentorship Program",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── TEAM ───────────────────────────────────────────────────────────────────
tm = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Our Team","The People Who Show Up","Ray Foundation is built by people who believe that education changes everything and are willing to work to prove it.",HERO_IMG,0.72),
    sec("Founder",crow(eyebrow("Founder and Executive Director")+"\n\n"+hd("Raymond Steven Jr.","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Raymond grew up in Bo, Sierra Leone, walking long miles to school each morning because his mother believed those miles were worth it. He survived the civil war. He earned a scholarship to study in the United States. And then he came back, not in person at first, but in commitment, founding Ray Foundation to build for the next generation what education had built for him.","18px",None,"center","16px")+"\n\n"+bd("He runs Ray Foundation from the belief that the most important thing he can do with the life he was given is make sure more children get the same chance.","18px",None,"center","0px")),LIGHT),
    sec("Values",
        crow(eyebrow("What Drives Us")+"\n\n"+hd("We Are Small. We Are Serious.","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Ray Foundation is a lean organization. We do not have large overhead. Every person who works with us, paid or volunteer, shares three things:","18px",None,"center","40px"))
        +"\n"+row3(
            eyebrow("Value One",CYAN,"left")+"\n\n"+hd("Accountability First","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("We photograph every classroom. We count every student. We report to donors with specifics, not generalities. If something went wrong, we say so.","15px",None,"left"),
            eyebrow("Value Two",CYAN,"left")+"\n\n"+hd("Community Always","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("We do not design programs from a distance and deliver them to passive recipients. Communities tell us what they need. We listen and we help.","15px",None,"left"),
            eyebrow("Value Three",CYAN,"left")+"\n\n"+hd("Dignity in Everything","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("We show the children we serve as the capable, intelligent, future-shaping people they are. Not as problems. Not as objects of pity.","15px",None,"left")
        )),
    sec("Join",crow(eyebrow("Get Involved")+"\n\n"+hd("Come Work With Us","h2","40px",None,"center","30px","24px")+"\n\n"+bd("We are always looking for volunteers, in-country partners, and skilled people who want to contribute their time. Reach out. We will find a place for it.","18px",None,"center","32px")+"\n\n"+ghost("Contact Us","https://rayfoundationsl.org/contact/",CYAN,"center")+"\n\n"+btn("Donate to Support the Team",PAYPAL,CYAN,WHITE,"center",True)),LIGHT),
    "<!-- /wp:divi/placeholder -->"
])

# ─── VOLUNTEERS ─────────────────────────────────────────────────────────────
vl = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Our Volunteers","This Work Is Carried by Many Hands","Ray Foundation would not exist without the volunteers who give their time, their skills, and their presence to the children of Sierra Leone.",HERO_IMG,0.72),
    sec("Who",crow(eyebrow("Who We Are")+"\n\n"+hd("A Community of Committed People","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Our volunteers come from Sierra Leone, from the United States, and from across the diaspora. Some volunteer via video call. Some travel to Bo. Some write, design, fundraise, and spread the word. All of them matter.","18px",None,"center","0px")),LIGHT),
    sec("How",
        crow(eyebrow("Ways to Volunteer")+"\n\n"+hd("Find Your Role","h2","40px",None,"center","30px","24px")+"\n\n"+bd("There is no minimum commitment. There is no required skill. If you have time and you care, we will find something meaningful for you to do.","18px",None,"center","40px"))
        +"\n"+row3(
            eyebrow("Mentorship",CYAN,"left")+"\n\n"+hd("Mentor a Student","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("One hour a month over video call. You share your story, your experience, and your encouragement with a student who needs all three.","15px",None,"left"),
            eyebrow("Skills",CYAN,"left")+"\n\n"+hd("Share Your Skills","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Teacher, engineer, accountant, writer, designer, doctor: whatever your skill is, there is a way to use it here. We match your background to a real need.","15px",None,"left"),
            eyebrow("Fundraise",CYAN,"left")+"\n\n"+hd("Raise Support","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Run a campaign, host an event, share our story. Every person who knows Ray Foundation exists is a potential donor. Help us grow the circle.","15px",None,"left")
        )),
    cta("Ready to Help?","Contact us and tell us a little about yourself and what you would like to do. We will get back to you within a week.",None,None,"Get in Touch","https://rayfoundationsl.org/contact/"),
    "<!-- /wp:divi/placeholder -->"
])

# ─── OUR PROJECTS ───────────────────────────────────────────────────────────
pj = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Our Projects","Four Ways We Show Up for Sierra Leone","Schools, books, water, and mentorship. These four things are the foundation every child needs before anything else can work.",SCHOOL_IMG,0.72),
    sec("Projects",
        row2(
            eyebrow("Project One",CYAN,"left")+"\n\n"+hd("Build Schools","h3","26px",None,"left","22px","20px","12px")+"\n\n"+bd("We build classrooms in communities where children learn under trees or walk hours to reach school. Seven classrooms built. More on the way.","16px",None,"left","20px")+"\n\n"+ghost("Learn More","https://rayfoundationsl.org/build-schools/",CYAN,"left"),
            eyebrow("Project Two",CYAN,"left")+"\n\n"+hd("Textbooks and Supplies","h3","26px",None,"left","22px","20px","12px")+"\n\n"+bd("We supply curriculum textbooks, notebooks, pencils, and teacher materials to schools where one book is shared between thirty students.","16px",None,"left","20px")+"\n\n"+ghost("Learn More","https://rayfoundationsl.org/textbooks/",CYAN,"left")
        )+"\n"+row2(
            eyebrow("Project Three",CYAN,"left")+"\n\n"+hd("Clean Water","h3","26px",None,"left","22px","20px","12px")+"\n\n"+bd("We support borehole drilling and protected well construction near schools. A sick child cannot learn. A child fetching water before school often does not arrive.","16px",None,"left","20px")+"\n\n"+ghost("Learn More","https://rayfoundationsl.org/clean-water/",CYAN,"left"),
            eyebrow("Project Four",CYAN,"left")+"\n\n"+hd("Mentorship","h3","26px",None,"left","22px","20px","12px")+"\n\n"+bd("We connect students with mentors from the Sierra Leonean diaspora. One hour a month. A relationship that changes what a student believes is possible.","16px",None,"left","20px")+"\n\n"+ghost("Learn More","https://rayfoundationsl.org/mentorship/",CYAN,"left")
        )),
    cta("Support All Four Programs","Your donation does not go to one project. It goes to the whole mission. We direct it where it is most needed at the moment you give.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── STORIES ────────────────────────────────────────────────────────────────
st = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Stories","Real People. Real Change.","Numbers tell you scale. Stories tell you truth. Here are some of the moments from our work in Sierra Leone that remind us why this matters.",HERO_IMG,0.72),
    sec("S1",crow(eyebrow("Kabala, 2024")+"\n\n"+hd("The Classroom Fatmata Waited For","h2","38px",None,"center","28px","24px")+"\n\n"+bd("Fatmata was eleven years old when the first Ray Foundation classroom opened in her community. She had been attending a school eight kilometers away, waking before sunrise and arriving home after dark. Her mother had already told her that the following year, she would have to stop going. The new classroom changed that. Fatmata is now in her second year of junior secondary school and her teacher says she is the strongest mathematics student in the class.","18px",None,"center","0px")),LIGHT),
    sec("S2",crow(eyebrow("Bo, 2023")+"\n\n"+hd("Mohamed and the Textbook He Could Take Home","h2","38px",None,"center","28px","24px")+"\n\n"+bd("Mohamed had never owned a textbook. Three students shared one for English, four for mathematics. When Ray Foundation delivered a full set to his class, his teacher said Mohamed stayed after the other students left, just reading. He took the mathematics book home and finished three chapters that weekend. He passed his primary school exam that year and is enrolled in secondary school today.","18px",None,"center","0px")),WHITE),
    sec("S3",crow(eyebrow("Freetown, 2024")+"\n\n"+hd("A Mentor Call That Turned Into a Plan","h2","38px",None,"center","28px","24px")+"\n\n"+bd("Aminata had never spoken to an engineer before her first mentorship call. Her mentor, a civil engineer from the Sierra Leonean diaspora in the UK, spent one hour with her talking about what engineers do and what she was already good at. By the end of the call, Aminata had written three things she was going to work on before they spoke again. She has kept every appointment since.","18px",None,"center","0px")),LIGHT),
    cta("Be Part of the Next Story","Every story here started with someone who gave, who showed up, who decided the children of Sierra Leone deserved more. You can be the reason the next story gets written.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── CONTACT ────────────────────────────────────────────────────────────────
ct = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Contact Us","We Would Love to Hear From You","Whether you want to donate, volunteer, partner with us, or just learn more about the work, we are here.",None,0.82),
    sec("Info",
        crow(eyebrow("Get in Touch")+"\n\n"+hd("Reach Ray Foundation","h2","40px",None,"center","30px","24px","40px"))
        +"\n"+row3(
            eyebrow("Email",CYAN,"center")+"\n\n"+hd("Write to Us","h3","20px",None,"center","18px","16px","10px")+"\n\n"+bd("raymondstevenjr@gmail.com","16px",CYAN,"center"),
            eyebrow("Location",CYAN,"center")+"\n\n"+hd("Where We Work","h3","20px",None,"center","18px","16px","10px")+"\n\n"+bd("Bo, Sierra Leone and the United States","16px",None,"center"),
            eyebrow("Donate",CYAN,"center")+"\n\n"+hd("Support the Work","h3","20px",None,"center","18px","16px","10px")+"\n\n"+bd("Donations processed securely through PayPal. Ray Foundation is a registered 501(c)(3).","16px",None,"center")
        ),LIGHT),
    sec("Volunteer",crow(eyebrow("Volunteers Welcome")+"\n\n"+hd("Want to Get Involved?","h2","40px",None,"center","30px","24px")+"\n\n"+bd("We are always looking for mentors, fundraisers, skilled volunteers, and community partners. If you have time and you care, reach out.","18px",None,"center","32px")+"\n\n"+ghost("See Volunteer Opportunities","https://rayfoundationsl.org/our-volunteers/",CYAN,"center"))),
    cta("The Easiest Way to Help Right Now","If you are not sure what to do first, donate. Even a small amount goes directly to a child who needs it.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── DONATE ─────────────────────────────────────────────────────────────────
dn = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Donate","Your Gift Builds Something That Lasts","A classroom in Bo. A textbook in Kabala. A mentor call that changes what a child believes is possible. Every dollar you give does something specific and real.",SCHOOL_IMG,0.65),
    sec("Why",crow(eyebrow("Where Your Money Goes")+"\n\n"+hd("Every Dollar Is Accountable","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Ray Foundation is a registered 501(c)(3) nonprofit. We photograph every classroom we build. We count every student we reach. We report back with specifics. People give again because they know their money worked.","18px",None,"center","0px")),LIGHT),
    sec("Give",
        crow(eyebrow("Make a Donation")+"\n\n"+hd("Give Today Through PayPal","h2","40px",None,"center","30px","24px")+"\n\n"+bd("All donations are processed securely through PayPal. You do not need a PayPal account. You can give with any major credit or debit card.","18px",None,"center","32px")+"\n\n"+btn("Donate Now via PayPal",PAYPAL,CYAN,WHITE,"center",True))
        +"\n"+row2(
            eyebrow("Your Gift Covers",CYAN,"left")+"\n\n"+hd("What Donations Fund","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("Building materials, teacher salaries, textbooks, school supplies, borehole drilling, and mentorship program coordination. No dollar goes to waste.","16px",None,"left"),
            eyebrow("Tax Deductible",CYAN,"left")+"\n\n"+hd("501(c)(3) Status","h3","24px",None,"left","20px","18px","10px")+"\n\n"+bd("Ray Foundation is a registered 501(c)(3) organization. Donations are tax-deductible to the extent allowed by US law. We provide a receipt for your records.","16px",None,"left")
        )),
    sec("Monthly",crow(eyebrow("More Ways to Help")+"\n\n"+hd("Become a Monthly Donor","h2","40px",None,"center","30px","24px")+"\n\n"+bd("A recurring gift of any size is the most powerful thing an individual can do for Ray Foundation. It lets us plan, hire, and build with confidence.","18px",None,"center","32px")+"\n\n"+btn("Give Monthly",PAYPAL,CYAN,WHITE,"center",True)),LIGHT),
    cta("A Child in Sierra Leone Is Waiting","Not metaphorically. Literally. There are children enrolled in Ray Foundation partner schools right now who need desks, books, and a teacher who can stay because the program is funded.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── EVENTS ─────────────────────────────────────────────────────────────────
ev = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Events","Come Together for Sierra Leone","Ray Foundation events are how we grow our community, raise awareness, and bring people face-to-face with the work happening thousands of miles away.",HERO_IMG,0.72),
    sec("Info",crow(eyebrow("Upcoming Events")+"\n\n"+hd("Stay Connected","h2","40px",None,"center","30px","24px")+"\n\n"+bd("We host fundraising dinners, community gatherings, and holiday celebrations throughout the year. Contact us to be added to our mailing list so you never miss an event.","18px",None,"center","32px")+"\n\n"+ghost("Contact Us to Stay Updated","https://rayfoundationsl.org/contact/",CYAN,"center")),LIGHT),
    sec("Annual",
        crow(eyebrow("Our Events")+"\n\n"+hd("Events We Run Each Year","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Two events anchor our year. Both are open to everyone who cares about the work.","18px",None,"center","40px"))
        +"\n"+row2(
            eyebrow("Annual",CYAN,"left")+"\n\n"+hd("Fundraising Gala","h3","26px",None,"left","22px","20px","12px")+"\n\n"+bd("Our annual fundraising event brings donors, partners, and community members together. We share project updates, honor supporters, and raise funds for the coming year.","16px",None,"left","20px")+"\n\n"+ghost("Learn More","https://rayfoundationsl.org/fundraising/",CYAN,"left"),
            eyebrow("Annual",CYAN,"left")+"\n\n"+hd("Christmas Party","h3","26px",None,"left","22px","20px","12px")+"\n\n"+bd("Our Christmas celebration is a community gathering where we come together, reflect on the year, recognize volunteers and donors, and look ahead to what comes next for the children we serve.","16px",None,"left","20px")+"\n\n"+ghost("Learn More","https://rayfoundationsl.org/christmas-party/",CYAN,"left")
        )),
    cta("Cannot Make an Event?","Your donation is always welcome. Every dollar given, whether at an event or from your kitchen table, goes to the same place: a child in Sierra Leone who needs it.","Donate Now",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── FUNDRAISING ────────────────────────────────────────────────────────────
fr = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Fundraising","Help Us Reach More Children","Ray Foundation runs on the generosity of people who believe education is a human right. Every fundraiser brings us closer to the next classroom, the next book, the next child.",SCHOOL_IMG,0.72),
    sec("How",crow(eyebrow("Get Involved")+"\n\n"+hd("Run Your Own Campaign","h2","40px",None,"center","30px","24px")+"\n\n"+bd("You do not need a big platform. Some of our most effective fundraisers simply told their friends on social media why they care about Sierra Leone and asked them to give.","18px",None,"center","0px")),LIGHT),
    sec("Ideas",
        crow(eyebrow("Fundraising Ideas")+"\n\n"+hd("Ways to Raise Money for Ray Foundation","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Here are a few ways people have fundraised for us. None required a big budget or a large following.","18px",None,"center","40px"))
        +"\n"+row3(
            eyebrow("Social Media",CYAN,"left")+"\n\n"+hd("Birthday Campaign","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Ask friends and family to donate to Ray Foundation instead of buying you a gift. Dozens of people have raised hundreds of dollars this way with a single post.","15px",None,"left"),
            eyebrow("Community",CYAN,"left")+"\n\n"+hd("Host an Event","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("A dinner, a movie night, a community walk. Charge a small entry fee, share the mission, and pass the donation link. We can provide materials.","15px",None,"left"),
            eyebrow("Workplace",CYAN,"left")+"\n\n"+hd("Corporate Match","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Many employers match charitable donations. Check if yours does and double the impact of every dollar you give to Ray Foundation.","15px",None,"left")
        )),
    cta("Start Today","The easiest first step is to make your own donation, then share our PayPal link with five people and tell them why you gave. That is a fundraising campaign.","Donate and Share",PAYPAL),
    "<!-- /wp:divi/placeholder -->"
])

# ─── CHRISTMAS PARTY ────────────────────────────────────────────────────────
xmas = "\n".join([
    "<!-- wp:divi/placeholder -->",
    hero_sec("Hero","Annual Event","Our Christmas Celebration","Every year, Ray Foundation gathers its community to celebrate the work, honor the people who made it possible, and look ahead to what we are building next. You are invited.",HERO_IMG,0.72),
    sec("About",crow(eyebrow("About the Celebration")+"\n\n"+hd("A Night for the Community","h2","40px",None,"center","30px","24px")+"\n\n"+bd("The Ray Foundation Christmas Party is more than a fundraiser. It is a gathering of people who believe that children in Sierra Leone deserve a real education and a real future. We celebrate the year achievements, recognize donors and volunteers, and share stories from the students and communities we serve.","18px",None,"center","16px")+"\n\n"+bd("Every year the event grows. Every year we have more classrooms to celebrate, more children to name, more people to thank. We hope to see you there.","18px",None,"center","0px")),LIGHT),
    sec("Details",
        crow(eyebrow("Event Highlights")+"\n\n"+hd("What to Expect","h2","40px",None,"center","30px","24px")+"\n\n"+bd("Details for this year event will be posted here as they are confirmed. Contact us to be added to our mailing list or follow us on social media to be first to know.","18px",None,"center","40px"))
        +"\n"+row3(
            eyebrow("Community",CYAN,"left")+"\n\n"+hd("Year in Review","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("We share photos and stories from every project we completed that year. You see exactly where the work happened and who it reached.","15px",None,"left"),
            eyebrow("Recognition",CYAN,"left")+"\n\n"+hd("Donor Appreciation","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("We recognize the individuals and organizations who made the year work possible. No contribution is too small to acknowledge.","15px",None,"left"),
            eyebrow("Celebration",CYAN,"left")+"\n\n"+hd("Food and Fellowship","h3","22px",None,"left","20px","18px","10px")+"\n\n"+bd("Sierra Leonean food, music, and community. A celebration that reflects the culture and warmth of the people we serve.","15px",None,"left")
        )),
    cta("Stay Updated","Contact us to be added to our event list or to ask about sponsorship opportunities for the Christmas Party.","Donate Now",PAYPAL,"Contact Us","https://rayfoundationsl.org/contact/"),
    "<!-- /wp:divi/placeholder -->"
])

pages = [
    {"ID":108, "title":"Build Schools",   "content":bs},
    {"ID":60,  "title":"Textbooks",       "content":tb},
    {"ID":110, "title":"Clean Water",     "content":cw},
    {"ID":73,  "title":"Mentorship",      "content":mn},
    {"ID":56,  "title":"Team",            "content":tm},
    {"ID":77,  "title":"Our Volunteers",  "content":vl},
    {"ID":50,  "title":"Our Projects",    "content":pj},
    {"ID":112, "title":"Stories",         "content":st},
    {"ID":52,  "title":"Contact",         "content":ct},
    {"ID":166, "title":"Donate",          "content":dn},
    {"ID":155, "title":"Events",          "content":ev},
    {"ID":157, "title":"Fundraising",     "content":fr},
    {"ID":75,  "title":"Christmas Party", "content":xmas},
]

with open('/home/user/ray/pages_to_push.json','w') as f:
    json.dump(pages, f, ensure_ascii=False)

print(f"Generated {len(pages)} pages:")
for p in pages:
    print(f"  ID {p['ID']:4d}: {p['title']:22s} ({len(p['content']):,} chars)")
