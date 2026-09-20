# Durga Puja 2026 content review

The page is implemented locally at `/durga-puja-2026`. It has not been deployed.

## Sources and editorial decisions

- The supplied `Mithila Durga Puja 2026 (1).png` is the most detailed programme. The organiser confirmed this sheet as authoritative, with Mithila Mahotsav corrected to Saturday 3:30–6:30 pm. The programme is now confirmed and the preview notice is removed.
- Dates: 17–19 October 2026, consistent across the programme, brochure, most artwork and the official Humanitix listing. The Facebook artwork that says 17–18 October is not used.
- Venue: Quakers Hill Community Centre, 7 Lalor Road, Quakers Hill NSW 2763, from the brochure and official Humanitix event page.
- The two supplied family illustrations and the `Banner Durga Puja.png` artwork are converted to WebP without changing their content. The illustrations are identified as illustrations in their alt text. The banner is available as a download.
- The GoFundMe URL is exactly the link supplied by the user: https://gofund.me/726018cad. A read-only HTTP check confirmed it redirects to the Mithila Cultural Society Australia fundraiser and returns HTTP 200. No donation or checkout was submitted.
- QR codes decoded from the supplied files identify the Seva, sponsorship and stall links below. The Mata ki Chowki QR points to the existing Mahotsav page, not a separate Chowki registration form.
- The existing Mahotsav page retains the EOI form, removes its expired July deadline and duplicated programme, and directs visitors to the new festival page.
- Old popup fundraising totals and package inclusions were removed because they are not live data and differ from the official booking page.

## Links

- Seva: https://events.humanitix.com/durga-puja/tickets
- Sponsorship: https://events.humanitix.com/durga-puja-sponsorship/tickets
- Mithila Haat: https://events.humanitix.com/mithila-haat/tickets
- Dandiya: https://events.humanitix.com/dandiya-nights (linked from MCSA's official Humanitix event and host pages)
- General enquiries: mithilaculturalsoc@gmail.com

The source event page and host listing were read on 20 September 2026. Web results may be cached. The Seva and stall ticket pages were readable; sponsorship and Dandiya detail pages could not be fetched by the web tool and returned HTTP 403 to an automated request. Their URLs are supported by the provided QR codes and the organiser's official listing. Prices, quantities remaining, detailed package benefits and stall furnishings are not duplicated on the website; the page links to the booking provider for current terms.

## Organiser confirmations needed

1. RESOLVED - The organiser confirmed the detailed programme sheet. Its Sunday Mahashtami / Mahanavami and Monday Dashami names are used; Mithila Mahotsav is corrected to 3:30–6:30 pm.
2. RESOLVED - Mata ki Chowki is Saturday 6:30–9:30 pm, followed by community dinner at 9:30 pm, per the confirmed detailed sheet.
3. Admission: brochure says free entry; detailed programme marks Mithila Mahotsav and Dandiya as ticketed. Confirm free Puja admission and a separate Mahotsav booking URL. The page provides an enquiry link instead of routing Mahotsav ticket buyers into a donation checkout.
4. RESOLVED - Organiser confirmed Shishirendu: 0426 399 461 and Chandra: 0416 476 725. Both are published with click-to-call links alongside the society email.
5. Seva packages: current Humanitix shows Community, Shubh Family and Yajman Seva; the brochure lists nine other offerings. Benefits differ from the former popup. Confirm which offerings should be described on the site.
6. Sponsorship: brochure uses Presenting/Heritage/Cultural/Community Partner; older flyer uses Title/Platinum/Gold/Silver. Confirm names and inclusions before publishing a comparison.
7. Stall setup: brochure says two tables and two chairs; Haat poster says one table and two chairs. Do not state remaining inventory, setup or early-bird availability without confirmation.
8. The endorsement pack has a community gathering on Saturday 4–7 pm overlapping the detailed cultural programme and Chowki. Confirm before adding it as a separate scheduled event.
9. Parking, accessibility and dietary arrangements are not provided. Visitors are directed to the organisers for assistance; no amenities are invented.

The trifold PDF and endorsement pack were reviewed but are not offered as public downloads yet because their schedules and contacts conflict. `poster 1.pdf` is an unfinished template and is not used. Past radio promotion and older conflicting artwork are not presented as current events.

## Updating the page

Edit shared event links, programme and FAQs in `src/data/durga-puja-2026.ts`. The programme is confirmed (`programmeConfirmed: true`). Keep the two event-card timing labels consistent with the programme when making future changes. Update this record with the decisions. Keep popup, feature and page links sourced from the same event data.

The calendar file saves 17–19 October as an all-day event (exclusive end date 20 October), saving the whole festival rather than a single timed session. Its status is confirmed.

## Khoichha and Kanya Pujan participation

- Added dedicated activity cards under "Sacred moments. Shared joy." with shareable links to `/durga-puja-2026/participate?activity=khoichha` and `?activity=kanya-pujan`.
- The selected activity is prefilled. Khoichha asks for the participant's contact details. Kanya Pujan asks for the parent/guardian's details, number of girls and guardian confirmation. No child names, birth dates, photographs or direct contact details are requested.
- Interest goes through the existing `/api/contact` email service. These submissions are enquiries, not bookings, and are not stored in the MM2026 EOI admin database. Delivery requires the existing `RESEND_API_KEY`, `EOI_FROM_EMAIL` and configured contact recipient. On failure, the form preserves the details and provides a prefilled email alternative. No automatic message is sent during testing.
- RESOLVED - The organiser explicitly confirmed the programme times for Sunday 18 October: Kanya Pujan 1:30–2:30 pm and Khoichha 2:30–4:30 pm (Sydney local time). These take precedence over the new posters showing 2–4 pm for both activities. The programme and activity cards already use the confirmed times; no timing change is needed. The cards read their times from the programme to avoid drift.
- The supplied Khoichha artwork is used in a cropped display area showing the illustration; the conflicting printed time is not presented. The Kanya Pujan card uses an ornamental treatment because its inline image has no local file path. The posters are not offered as downloads.
