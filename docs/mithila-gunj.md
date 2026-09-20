# Mithila Gunj

The homepage feature below Durga Puja and the sitewide footer link to `/mithila-gunj`.

## Replace the photo through admin

In Admin → Blog Posts, create or edit a post titled exactly `Mithila Gunj`. Upload your image as the first image and publish the post. Both the homepage feature and radio page use that published post's first image. This also publishes a normal blog post, so include a suitable introduction. Draft posts do not replace the photo. Removing the image restores the default studio photograph.

The shared image component is `src/components/sections/MithilaGunjImage.tsx`. Both pages render dynamically so published photo changes are read on subsequent requests.

Default photo: organiser-supplied group photograph, `WhatsApp Image 2026-09-21 at 07.14.37.jpeg`, copied to `public/images/mithila-gunj-community.jpeg`. The radio page also displays the organiser-supplied `WhatsApp Image 2026-09-21 at 07.16.10.jpeg` as `public/images/mithila-gunj-studio.jpeg`. Both are displayed at their natural aspect ratio without cropping faces. These replace the illustrative stock photograph.
