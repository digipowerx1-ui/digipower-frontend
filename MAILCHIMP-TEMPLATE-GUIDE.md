# DigiPowerX Mailchimp Newsletter Template - Setup Guide

## 📧 Template Overview

This Mailchimp-compatible HTML email template features your brand's navy (#334152) and cyan (#01d3ff) color scheme and includes sections for:

1. **Latest News** - Showcase 2 recent company news articles
2. **Stock Performance** - Display live stock price and key metrics
3. **SEC Filings** - Highlight recent regulatory filings
4. **Upcoming Events** - Promote investor events and presentations

## 🚀 How to Import into Mailchimp

### Step 1: Upload to Mailchimp

1. Log into your Mailchimp account
2. Go to **Campaigns** → **Email Templates**
3. Click **Create Template** → **Code Your Own**
4. Click **Paste in code**
5. Copy the entire contents of `mailchimp-newsletter-template.html`
6. Paste into Mailchimp and click **Save**

### Step 2: Replace Merge Tags

The template uses Mailchimp merge tags (variables) that you'll need to replace with actual data before sending. Here's a complete list:

## 📝 Merge Tags to Replace

### Header Section
- `*|DATE:M d, Y|*` - Auto-formats to current date (e.g., "Nov 23, 2025")

### Latest News Section
```
*|NEWS_LINK_1|* - URL to first news article
*|NEWS_LINK_2|* - URL to second news article
```
**Manual Edit Required:** Replace news headlines and descriptions with actual content

### Stock Performance Section
```
*|STOCK_SYMBOL|* - Your stock ticker (e.g., "DGPW")
*|STOCK_DATE|* - Stock data timestamp
*|STOCK_PRICE|* - Current stock price (e.g., "12.45")
*|STOCK_CHANGE|* - Price change amount (e.g., "+0.58")
*|STOCK_CHANGE_PERCENT|* - Percentage change (e.g., "4.87")
*|STOCK_OPEN|* - Opening price
*|STOCK_VOLUME|* - Trading volume (e.g., "1.2M")
*|STOCK_HIGH|* - Day's high price
*|STOCK_LOW|* - Day's low price
*|STOCK_PAGE_LINK|* - URL to your stock information page
```

**Note:** For positive changes, use green color. For negative, change the color to red:
```html
<!-- Positive Change (Green) -->
<span style="color: #10b981; ... background-color: rgba(16, 185, 129, 0.15);">
    ▲ +0.58 (4.87%)
</span>

<!-- Negative Change (Red) -->
<span style="color: #ef4444; ... background-color: rgba(239, 68, 68, 0.15);">
    ▼ -0.32 (2.51%)
</span>
```

### SEC Filings Section
```
*|SEC_FORM_TYPE_1|* - Form type (e.g., "10-Q", "8-K", "10-K")
*|SEC_TITLE_1|* - Filing title/description
*|SEC_DATE_1|* - Filing date
*|SEC_LINK_1|* - Link to PDF download

*|SEC_FORM_TYPE_2|* - Second filing form type
*|SEC_TITLE_2|* - Second filing title
*|SEC_DATE_2|* - Second filing date
*|SEC_LINK_2|* - Second filing link

*|SEC_PAGE_LINK|* - URL to your SEC filings page
```

### Upcoming Events Section
```
*|EVENT_DAY_1|* - Day number (e.g., "15")
*|EVENT_MONTH_1|* - Month abbreviation (e.g., "DEC")
*|EVENT_TYPE_1|* - Event type (e.g., "EARNINGS CALL", "INVESTOR PRESENTATION")
*|EVENT_TITLE_1|* - Event title
*|EVENT_TIME_1|* - Event time (e.g., "10:00 AM EST")
*|EVENT_LOCATION_1|* - Event location or "Virtual Webcast"
*|EVENT_LINK_1|* - Registration/details URL

*|EVENT_DAY_2|* - Second event day
*|EVENT_MONTH_2|* - Second event month
*|EVENT_TYPE_2|* - Second event type
*|EVENT_TITLE_2|* - Second event title
*|EVENT_TIME_2|* - Second event time
*|EVENT_LOCATION_2|* - Second event location
*|EVENT_LINK_2|* - Second event link

*|EVENTS_PAGE_LINK|* - URL to your events/presentations page
```

### CTA & Footer Section
```
*|INVESTOR_PAGE_LINK|* - URL to your investor relations homepage
*|COMPANY_ADDRESS|* - Your company's mailing address
*|LINKEDIN_URL|* - Your LinkedIn profile URL
*|TWITTER_URL|* - Your Twitter/X profile URL
*|WEBSITE_URL|* - Your company website URL
*|UPDATE_PROFILE|* - Mailchimp auto-tag for preference center
*|UNSUB|* - Mailchimp auto-tag for unsubscribe link
```

## 🎨 Customization Tips

### Adding More News Items

To add a third news item, copy this block after News Item 2:

```html
<!-- News Item 3 -->
<tr>
    <td class="mobile-padding" style="padding: 0 30px 20px 30px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #01d3ff;">
            <tr>
                <td style="padding: 20px;">
                    <p style="color: #01d3ff; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.5px;">
                        *|DATE:M d, Y|*
                    </p>
                    <h3 style="color: #1e293b; font-size: 18px; font-weight: 600; margin: 0 0 10px 0; line-height: 1.4;">
                        [Third News Headline]
                    </h3>
                    <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
                        Brief description...
                    </p>
                    <a href="*|NEWS_LINK_3|*" style="display: inline-block; color: #01d3ff; font-size: 14px; font-weight: 600; text-decoration: none; border-bottom: 2px solid #01d3ff; padding-bottom: 2px;">
                        Read More →
                    </a>
                </td>
            </tr>
        </table>
    </td>
</tr>
```

### Changing Colors

**Brand Colors:**
- Navy: `#334152`
- Cyan: `#01d3ff`
- Dark Navy: `#1a2633`

To change the gradient colors, search for:
```html
background: linear-gradient(135deg, #334152 0%, #01d3ff 100%);
```

### Testing Across Email Clients

Before sending, test your email in:
- Gmail (Desktop & Mobile)
- Outlook (Desktop)
- Apple Mail (iOS & macOS)
- Yahoo Mail
- Mobile devices (iOS & Android)

Mailchimp provides a **Preview and Test** feature - use it!

## 📱 Mobile Responsive

The template is fully responsive with:
- Stacked layouts on mobile
- Optimized font sizes
- Touch-friendly buttons (44px minimum)
- Mobile-specific padding adjustments

## ✅ Best Practices

1. **Subject Line:** Keep under 50 characters
2. **Preheader Text:** Use the first 80-100 characters wisely
3. **Images:** Add actual images for logos/graphics (currently uses emojis)
4. **Alt Text:** Always add alt text to images
5. **Testing:** Send test emails to yourself first
6. **Timing:** Best send times are Tuesday-Thursday, 10 AM - 2 PM
7. **Frequency:** Monthly or quarterly for investor newsletters

## 🔗 Integration with Your Website

You can populate this template dynamically using Mailchimp's API or RSS-to-Email feature:

### Option 1: Mailchimp API
Use the Mailchimp API to programmatically update merge tags with data from your website's API.

### Option 2: RSS-to-Email
If you have RSS feeds for news, you can use Mailchimp's RSS-to-Email feature to automatically populate the latest news section.

### Option 3: Manual Updates
Update the template monthly with current data before sending each campaign.

## 🆘 Support

For Mailchimp-specific questions:
- Mailchimp Help Center: https://mailchimp.com/help/
- Email Template Guide: https://mailchimp.com/help/create-a-template-with-the-template-builder/

For template customization help, refer to the HTML/CSS code comments in the template file.

---

**Template Version:** 1.0
**Last Updated:** November 2025
**Compatible with:** Mailchimp, Campaign Monitor, Constant Contact, and most major email service providers