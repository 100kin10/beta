import gspread
import io

# google login
gs = gspread.login('craig@cultivatedwit.com', 'poqw5678')

# open the application response spreadsheet
# keeping this separate so I don't destroy everything
wks = gs.open("100kin10 Partner Data").sheet1
#wks.update_acell('A1',"wwww")

wksEmptyNameRow = 2
while wks.acell('A%i' % wksEmptyNameRow).value != "":
	wksEmptyNameRow += 1
cell_list = wks.range('A2:A%i' % wksEmptyNameRow)

allHTML = ""

for cell in cell_list:
	if cell.value != "":
		row = cell.row
		name = wks.acell('A%i' % row).value
		location = wks.acell('B%i' % row).value
		blurb = wks.acell('C%i' % row).value
		program_offerings = wks.acell('D%i' % row).value
		ideal_recruit = wks.acell('E%i' % row).value
		special = wks.acell('F%i' % row).value
		learn_more = wks.acell('G%i' % row).value
		contact = wks.acell('H%i' % row).value

		name_slug = name.replace(' ', '_')

		program_offerings = program_offerings.split('/n')
		program_offerings_html = ""
		for offering in program_offerings:
			print offering
			program_offerings_html = program_offerings_html + """<li class="partner-extra-body">%s</li>""" % offering

		ideal_recruit = ideal_recruit.split('/n')
		ideal_recruit_html = ""
		for recruit in ideal_recruit:
			ideal_recruit_html = ideal_recruit_html + """<li class="partner-extra-body">%s</li>""" % recruit

		special = special.split('/n')
		special_html = ""
		for specialist in special:
			special_html = special_html + """<li class="partner-extra-body">%s</li>""" % specialist

		learn_more = learn_more.split('/n')
		learn_more_html = ""
		for learn in learn_more:
			learn_more_html = learn_more_html + """<li class="partner-extra-body">%s</li>""" % learn

		contact = contact.split('/n')
		contact_html = ""
		for contacter in contact:
			contact_html = contact_html + """<li class="partner-extra-body">%s</li>""" % contacter

		body = """
			<div class="single-partner row">
			  <div class="column large-8 answer-copy">
			    <h4 class="partner-name">%s</h4>
			    <p class="partner-info">%s</p>
			    <a id="learn-more-%s" href="#" class="partner-link">Learn more</a>
			  </div>
			  <span class="column large-3 large-offset-1 answer-copy-location-contact">
			    <h5 class="partner-info-header">Location</h5>
			    <p class="partner-info ">%s</p>
			    <h5 class="partner-info-header">Website</h5>
			    <p class="partner-info"><a href="http://woodrow.org/fellowships/ww-teaching-fellowships/">Woodrow.org</a></p>
			  </span>
			  <section id="fullscreen-%s" class="fullscreen_hide fullscreen">
			    <div class="row">
			      <div class="column small-12 extra-spacer">
			        <a href="#" class="close"><img src="img/close.svg" alt="close"></a>
			      </div>
			    </div>
			    <div class="row">
			      <div class="partner-listing column small-8">
			        <h4 class="partner-extra-name">%s</h4>
			        <p class="partner-extra-body">%s</p>
			        <a class="partner-extra-visit" href="#">Visit their website</a>
			        <h5 class="partner-extra-section-header partner-info-header">This program offers:</h5>
			        <ul class="partner-extra-list">
			          %s
			        </ul>
			        <h5 class="partner-extra-section-header partner-info-header">Their ideal recruit:</h5>
			        <ul class="partner-extra-list">
			          %s
			        </ul>
			        <h5 class="partner-extra-section-header partner-info-header">What makes them special is:</h5>
			        <ul class="partner-extra-list">
			          %s
			        </ul>
			        <h5 class="partner-extra-section-header partner-info-header">If you want to learn more check out:</h5>
			        <ul class="partner-extra-list">
			          %s
			        </ul>
			      </div>
			      <div class="column small-3 small-offset-1 partner-extra-details">
			        <h5 class="partner-info-header">Location</h5>
			        <p class="partner-info partner-extra-details-body">%s</p>
			        <h5 class="partner-info-header">Website</h5>
			        <p class="partner-info partner-extra-details-body"><a href="http://woodrow.org/fellowships/ww-teaching-fellowships/">Woodrow.org</a></p>
			        <h5 class="partner-info-header">Contact</h5>
			        %s
			      </div>
			    </div>
			  </section>
			</div>
			""" % (name, blurb, name_slug, location, name_slug, name, blurb, program_offerings, ideal_recruit_html, special_html, learn_more_html, location, contact_html)
		#print body
		body = unicode(body)

		allHTML = allHTML + body

file = io.open("partners/all.html", "w")
file.write(allHTML)
file.close()

#with open('partners.txt') as infile, open('output.txt', 'w') as outfile:
#    copy = False
#    nameString = ""
#    for line in infile:
#    	if line[:1].isalpha():
#    		pass
#    	else:
#    		line = line[2:]
#    	line = line.lstrip(' ')
#    	outfile.write(line)
#    	outfile.write("\n")
        #if line.strip() == "Name:":
        #    copy = True
        #elif line.strip() == "Location:":
        #    copy = False
        #if line.strip() == "Location:":
        #    copy = True
        #elif line.strip() == "Blurb:":
        #    copy = False
        #if line.strip() == "Blurb:":
        #    copy = True
        #elif line.strip() == "This program offers:":
        #    copy = False
        #if line.strip() == "This program offers:":
        #    copy = True
        #elif line.strip() == "Their ideal recruit:":
        #    copy = False
        #here
        #if line.strip() == "Their ideal recruit:":
        #    copy = True
        #elif line.strip() == "What makes them special is:":
        #    copy = False
        #if line.strip() == "What makes them special is:":
        #    copy = True
        #elif line.strip() == "If you want to learn more check out:":
        #    copy = False
        #if line.strip() == "If you want to learn more check out:":
        #    copy = True
        #elif line.strip() == "Contact them by:":
        #    copy = False
        #if line.strip() == "Contact them by:":
        #    copy = True
        #elif line.strip() == "Name:":
        #    copy = False
    	#elif copy == True:
        #	outfile.write(line)
