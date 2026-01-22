/**
 * Email Template Generator for Stock EOD Updates
 * Creates responsive HTML emails with DigiPowerX branding
 */

/**
 * Generate HTML email for stock end-of-day update
 * @param {Object} stockData - Stock data from stock-service
 * @param {Object} subscriber - Subscriber data (optional, for personalization)
 * @returns {string} - HTML email content
 */
export function generateStockEODEmail(stockData, subscriber = {}) {
  const { firstName = 'Investor' } = subscriber;

  // Determine color based on stock direction
  const color = stockData.direction === 'up' ? '#22c55e' :
                stockData.direction === 'down' ? '#ef4444' : '#6b7280';

  // Arrow symbol for change
  const arrow = stockData.direction === 'up' ? '▲' :
                stockData.direction === 'down' ? '▼' : '−';

  // Format prices with 2 decimal places
  const formatPrice = (price) => price !== null && price !== undefined ? `$${price.toFixed(2)}` : 'N/A';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Stock Update - DigiPowerX</title>
  <style type="text/css">
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-spacing: 0; border-collapse: collapse; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 600px !important; }
      .mobile-padding { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f1f5f9;">
    <tr>
      <td style="padding: 40px 0;">
        <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #334152 0%, #01d3ff 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 15px;">📈</div>
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.5px;">Stock Update</h1>
              <p style="color: #ffffff; font-size: 16px; margin: 0; opacity: 0.95;">DigiPowerX Investor Relations</p>
            </td>
          </tr>

          <tr><td style="height: 30px;"></td></tr>

          <!-- Greeting -->
          <tr>
            <td class="mobile-padding" style="padding: 0 30px 15px 30px;">
              <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin: 0;">Hi Investor,</p>
            </td>
          </tr>

          <!-- Stock Card -->
          <tr>
            <td class="mobile-padding" style="padding: 0 30px 15px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="80">
                          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, rgba(51, 65, 82, 0.1) 0%, rgba(1, 211, 255, 0.1) 100%); border-radius: 8px; text-align: center; line-height: 60px; font-size: 32px;">
                            📊
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td>
                                <p style="background-color: ${color}; color: #ffffff; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; display: inline-block; margin: 0 0 10px 0;">${stockData.symbol}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h3 style="color: #1e293b; font-size: 36px; font-weight: 700; margin: 0 0 8px 0; line-height: 1;">${formatPrice(stockData.price)}</h3>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="color: ${color}; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">${arrow} ${formatPrice(Math.abs(stockData.change))} (${stockData.changePercent > 0 ? '+' : ''}${stockData.changePercent.toFixed(2)}%)</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="color: #64748b; font-size: 13px; margin: 0;">As of ${stockData.date}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Metrics -->
          <tr>
            <td class="mobile-padding" style="padding: 0 30px 15px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="25%" style="padding: 10px; text-align: center;">
                    <p style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 5px 0;">OPEN</p>
                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${formatPrice(stockData.open)}</p>
                  </td>
                  <td width="25%" style="padding: 10px; text-align: center;">
                    <p style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 5px 0;">HIGH</p>
                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${formatPrice(stockData.high)}</p>
                  </td>
                  <td width="25%" style="padding: 10px; text-align: center;">
                    <p style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 5px 0;">LOW</p>
                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${formatPrice(stockData.low)}</p>
                  </td>
                  <td width="25%" style="padding: 10px; text-align: center;">
                    <p style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 5px 0;">VOLUME</p>
                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${stockData.volume}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View Investor Dashboard Button -->
          <tr>
            <td class="mobile-padding" style="padding: 10px 30px 0 30px; text-align: center;">
              <a href="https://digipowerx.com/investor-relations" style="display: inline-block; color: #334152; font-size: 14px; font-weight: 600; text-decoration: none; border: 2px solid #334152; padding: 10px 25px; border-radius: 6px;">View Investor Dashboard →</a>
            </td>
          </tr>

          <tr><td style="height: 30px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">DigiPowerX</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 10px 0;">You're receiving this email because you subscribed to DigiPowerX stock alerts.</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                <a href="https://digipowerx.com/investor-relations" style="color: #01d3ff; text-decoration: none;">Investor Relations</a> |
                <a href="*|UNSUB|*" style="color: #01d3ff; text-decoration: none;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text version of the email (for email clients that don't support HTML)
 * @param {Object} stockData - Stock data
 * @param {Object} subscriber - Subscriber data
 * @returns {string} - Plain text email
 */
export function generateStockEODPlainText(stockData, subscriber = {}) {
  const { firstName = 'Investor' } = subscriber;
  const arrow = stockData.direction === 'up' ? '▲' : stockData.direction === 'down' ? '▼' : '−';
  const formatPrice = (price) => price !== null && price !== undefined ? `$${price.toFixed(2)}` : 'N/A';

  return `
DigiPowerX Stock Update - ${stockData.date}

Hi Investor,

Here's today's end-of-day summary for ${stockData.symbol}.

Current Price: ${formatPrice(stockData.price)}
Change: ${arrow} ${formatPrice(Math.abs(stockData.change))} (${stockData.changePercent > 0 ? '+' : ''}${stockData.changePercent.toFixed(2)}%)

Today's Performance:
- Open: ${formatPrice(stockData.open)}
- High: ${formatPrice(stockData.high)}
- Low: ${formatPrice(stockData.low)}
- Volume: ${stockData.volume}

View more details on our Investor Dashboard:
https://digipowerx.com/investor-relations

---
You're receiving this email because you subscribed to DigiPowerX stock alerts.

Unsubscribe: *|UNSUB|*
Visit Our Website: https://digipowerx.com

© ${new Date().getFullYear()} DigiPowerX. All rights reserved.
  `.trim();
}
