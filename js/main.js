var persons = {
    'person1': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Attackers',
        text: 'Pellentesque auctor neque nec urna. Praesent turpis.Nunc nulla. Pellentesque auctor neque nec urna.'
    },
    'person2': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Attackers',
        text: 'Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Aenean viverra rhoncus pede.'
    },
    'person3': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Attackers',
        text: 'Duis vel nibh at velit scelerisque suscipit. Phasellus nec sem in justo pellentesque facilisis.'
    },
    'person4': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Attackers',
        text: 'Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Praesent turpis. Curabitur nisi. Sed in libero ut nibh placerat accumsan.'
    },
    'person5': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Defenders',
        text: 'Aliquam erat volutpat. Maecenas malesuada. Suspendisse feugiat. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.'
    },
    'person6': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Defenders',
        text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.'
    },
    'person7': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Defenders',
        text: 'Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Phasellus nec sem in justo pellentesque facilisis. Fusce pharetra convallis urna. Vivamus elementum semper nisi. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.'
    },
    'person8': {
        imagePath: 'img/person.png',
        imageWidth: '297',
        imageHeight: '285',
        type: 'Defenders',
        text: 'Pellentesque auctor neque nec urna.'
    },
};

// Image flow options
var imageFlowOptions = {
    ImageFlowID:'myImageFlow',
    reflections: false,
    reflectionP: 0.0,
    captions: true,
    imageCursor: 'pointer',
    opacity: true,
    circular: true,
    buttons: true,
    slider: false,
    xStep: 50,
    imageFocusMax: 2,
    onClick: function() {
        alert('Landescape image clicked !');
    }
};

var types = [];
for (person in persons) {
    if (types.indexOf(persons[person].type) === -1) {
        types.push(persons[person].type);
    }
}

for (var i=0; i<types.length; i++) {
    var filterElement = '<li><a href="#">' + types[i] + '</a></li>';
    $('#imageFilters ul').append(filterElement);
}

if (window.outerWidth <= 640) {
    document.getElementById('wrapper').className = 'mobile';
    imageFlowOptions.imageFocusMax = 0;
} else {
    document.getElementById('wrapper').className = 'desktop';
    imageFlowOptions.imageFocusMax = 2;
}


/* Create ImageFlow instances when the DOM structure has been loaded */
domReady(function()
{
    // Using DOM to render images from JSON
    var renderImages = function(persons) {
        var imageFlowDiv = document.getElementById('myImageFlow');
        // Clean up div child
        while (imageFlowDiv.firstChild) {
            imageFlowDiv.removeChild(imageFlowDiv.firstChild);
        }
        // create image elements
        for (var key in persons) {
            var elem = document.createElement('img');
            elem.setAttribute('src', persons[key].imagePath);
            elem.setAttribute('height', persons[key].imageHeight);
            elem.setAttribute('width', persons[key].imageWidth);
            elem.setAttribute('alt', key);
            imageFlowDiv.appendChild(elem);
        }
    };

    // render images by persons JSON
    renderImages(persons);

    var instanceOne = new ImageFlow();

    // init function + addResizeEvent for responsive
    var initImageFlowByOptions = function(instanceOne, options) {
        instanceOne.init(imageFlowOptions);
    }

    initImageFlowByOptions(instanceOne, imageFlowOptions);

    // For debug
    window.instanceOne = instanceOne;
});

