// Master DOManipulator v2 ------------------------------------------------------------
var items = document.querySelectorAll('.item'),
controls = document.querySelectorAll('.control'),
headerItems = document.querySelectorAll('.item-header'),
descriptionItems = document.querySelectorAll('.item-description'),
activeDelay = .76,
interval = 5000;

var current = 0;

var slider = {
  init: function init() {
    controls.forEach(function (control) {return control.addEventListener('click', function (e) {slider.clickedControl(e);});});
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: function nextSlide() {// Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: function clickedControl(e) {// Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    var control = e.target,
    dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach(function (item, index) {
      if (index === dataIndex) {// Add active class to corresponding slide
        item.classList.add('active');
      }
    });
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: function reset() {// Remove active classes
    items.forEach(function (item) {return item.classList.remove('active');});
    controls.forEach(function (control) {return control.classList.remove('active');});
  },
  transitionDelay: function transitionDelay(items) {// Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    var seconds = void 0;

    items.forEach(function (item) {
      var children = item.childNodes; // .vertical-part(s)
      var count = 1,
      delay = void 0;

      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(function (child) {// iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = delay + 's'; // b element
          count++;
        }
      });
    });
  } };


var intervalF = setInterval(slider.nextSlide, interval);
slider.init();




AOS.init({
  duration:2000,
});