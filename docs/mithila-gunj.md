# Mithila Gunj

The homepage feature below Durga Puja and the sitewide footer link to `/mithila-gunj`.

## Replace the photo through admin

In Admin → Blog Posts, create or edit a post titled exactly `Mithila Gunj`. Upload your image as the first image and publish the post. Both the homepage feature and radio page use that published post's first image. This also publishes a normal blog post, so include a suitable introduction. Draft posts do not replace the photo. Removing the image restores the default studio photograph.

The shared image component is `src/components/sections/MithilaGunjImage.tsx`. Both pages render dynamically so published photo changes are read on subsequent requests.

Default photo: Jacob Hodgson, Unsplash, https://unsplash.com/photos/black-and-gray-microphone-with-stand-5ULLwpOS5V8 . Downloaded from https://images.unsplash.com/photo-1627667049482-dd134b1f6366 . This is an illustrative studio photograph, not a photograph of the Mithila Gunj studio. Attribution appears with the default image only.
