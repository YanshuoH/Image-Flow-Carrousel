# Image-Flow-Carrousel
Wrapper of JS plugin [Image Flow](http://finnrudolph.com/products/imageflow) which generate some perfect effects of Image Gallery /Image Carrousel/ Image Flow or whatever you call it.

This [DEMO](http://yanshuoh.github.io/Image-Flow-Carrousel/) shows some simple strategies of extending functions of ImageFlow and Responsive.

## Simple Start
[Documentations](http://finnrudolph.com/products/imageflow/documentation)

## DOM Manipulation
### Navigation
Custom navigation buttons associate with ImageFlow's original buttons.
Example of JQuery
```javascript
  $('#btn-next').on('click', function() {
      $(instanceOne.buttonNextDiv).click();
  });
```

### Filter
Since the data based on a JSON variable, it is possible to filter them.
This demo gives a silly and straight forward solution: clean up the DIV, re-render images, re-init the plugin
```javascript
  $('#imageFilters a').on('click', function(event) {
      // filter image lists before rendering
      renderImages(
          filterList(persons, $(this).text())
      );
      initImageFlowByOptions(instanceOne, imageFlowOptions);
  });
```
Pity that no more refresh API provided by Image Flow, and its native refresh() function does not parse the original image div anymore after first init().
But I may be wrong...

### Caption watching
Objectif of watching the caption's div is to fetch/render other data from the JSON.
```javascript
  $('#myImageFlow_caption').bind('DOMSubtreeModified', function(e) {
      if (e.target.innerHTML.length > 0) {
        var $this = $(this);
        var key = $this.text();
        $('#imageName').text(key);
      }
  });
```

## Responsive
### Before
As mentioned above, we can't update the options, so we reset the plugin.
Before doing that, wrap all DOM manipulations in a function to re-call them
```javascript
    // Wrap function for other event listeners
    var initAddon = function() {
        // Hide caption text, render other places
        $(instanceOne.captionDiv).hide();
        // Watch caption changing
        watchCaption();
    }
```
And of course, responsive CSS code for the DIV of images container
```css
@media (max-width: 640px) {
    #myImageFlow {
        width: 325px;
        margin: auto;
    }
}

@media (min-width: 1280px) {
    #myImageFlow {
        width: 1000px;
        margin: auto;
    }
}
```
### After
Starting by mobile device, if we want to display only one person in the carrousel, simple tell your JS to init the plugin by changing this:
```javascript
  // Exemple
  if (window.outerWidth <= 640) {
      imageFlowOptions.imageFocusMax = 0;
  }
```
Or you can do it by existing of a defined class.

Or you can do it by detecting userAgent, but no recommend.

Inverse process for desktop device.

### During window resize
Instead of rewrite window.onresize function, simply add an eventListner of window resize.

Then the same as above, re-init the plugin by using some new options. Case of reducing width
```javascript
    window.addEventListener('resize', function(event){
        if (window.outerWidth <= 640) {
            // Rendering images
            renderImages(persons);

            var minImageFlowOptions = imageFlowOptions;
            minImageFlowOptions.imageFocusMax = 0;

            // Re-init, show only one person
            initImageFlowByOptions(instanceOne, minImageFlowOptions);
        }
    });
```
But this can cause an enormous number of re-init. To avoid, simply do this:
```javascript
    var wrapper = $('#wrapper');
    window.addEventListener('resize', function(event){
        if (window.outerWidth <= 640
            && wrapper.attr('class').indexOf('mobile') === -1
        ) {
            // Re-init with new options
            ...
        }
    });
```
And the resize function will know if it's the first time of re-init.

## Browser support
Tested in IE 8 9 10 11, Firefox 36, Chrome 41, Safari 5.1(Windows).
Also tested in tablet Samsung, iOS.
## Future
* Maybe a class of wrapper would be better for code lecture and structure
* Optimize touch-slide when using tablet
