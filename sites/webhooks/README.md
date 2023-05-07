# Newsletter Automation, Kinda

The [_Learn With Jason_ newsletter](https://lwj.dev/newsletter) goes out every week with a pretty standard format:

1. A "big idea" main thought written as prose at the top
2. Two featured pieces, shown with thumbnail images and short descriptions
3. Upcoming _Learn With Jason_ episodes shown in a table

Trying to make this work inside the ConvertKit editor is... not great.

I also don't really want to write content in source code or in ConvertKit’s janky WYSIWYG editor. I’d much rather write in [Notion](https://notion.so).

[MJML](https://mjml.io/) makes this much less painful, but then you have to get the MJML into ConvertKit somehow. I was originally thinking I'd follow [Josh Comeau’s approach](https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/), but that didn't work for me because the ConvertKit API apparently modifies incoming HTML in a way that broke my layout.

_However_, if I copy-paste the MJML output into a ConvertKit template, it works. ConvertKit complains that my template is invalid because there’s no `{{ message_content }}` merge tag, but _neener neener_ ConvertKit you’re not my real dad and I can do whatever I want.

So the workflow now is:

## 1. Write the newsletter content in Notion

I have a database in Notion where I create entries for both the big idea and for featured content. There are custom properties for most of the content, and the big idea prose is entered as standard content blocks.

![The Notion database where I write my newsletters.](https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_1200/v1683492282/lwj/code/notion-newsletter.png)

Using the [Notion API](https://developers.notion.com/), this webhook loads the Notion content as well as upcoming episodes from the [_Learn With Jason_ API](https://github.com/learnwithjason/learnwithjason.dev/tree/main/sites/api).

## 2. Set up the template with MJML

Next, the webhook grabs MJML templates and drops the loaded data into them, resulting in a full newsletter written and marked up in MJML.

## 3. Generate the HTML

Turning the MJML into HTML gives us a final newsletter, which is what this webhook returns. It shows up fully formatted in the browser for a quick spot check.

## 4. Copy the source into a new ConvertKit template

ConvertKit’s API, unfortunately, doesn’t give any control over templates, so this next step is still manual. (Originally I thought this would work as an automated process, which is why this is in the webhooks project and not somewhere else. If ConvertKit ever fixes their APIs, I’ll fully automate this part.)

I also thought I’d be able to [create a broadcast with the generated HTML](https://developers.convertkit.com/#broadcasts), but ConvertKit does some kind of weird sanitization that breaks the uploaded HTML. They don’t do the same sanitization on templates uploaded through their UI, though, so... here we are.

To work around ConvertKit’s limitations, view the source of the template returned from this webhook and copy it, then open the [templates section of the ConvertKit dashboard](https://app.convertkit.com/account/email_layout_templates) and create a new email template. (Don’t update an existing one if you make previous broadcasts public; they’ll all change if you do.)

Choose the “import code” option and paste in your HTML. I always name the template the intended send date, but you can do whatever makes sense to you.

Finally, create a new broadcast and choose the new template. You’ll get a warning that the template is invalid, but it won’t prevent you from sending it.

![Warning in the ConvertKit UI that says, “Layout templates must contain the `{{ message_content }}` tag to be valid. Edit email templates.”](https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto/v1683493706/lwj/code/convertkit-template-warning.jpg)

Ignore the warning, finish sending or scheduling your email, and you’re good to go!

## Special note: do you work at ConvertKit?

Please help us get either a “do not sanitize” option enabled for the Broadcasts API or a new API endpoint for creating new templates. It would make at least a handful of developers’ lives much easier. Please and thank you!
