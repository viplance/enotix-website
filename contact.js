(function () {
  'use strict';

  var contactEmail = document.getElementById('contact-email');
  var contactPhone = document.getElementById('contact-phone');
  var contactStatus = document.getElementById('contact-status');
  if (!contactEmail || !contactPhone || !contactStatus) return;

  // Reuse the VST site's delayed reveal and split contact strings.
  // This deters simple scrapers; bots that run JavaScript can still read them.
  window.setTimeout(function () {
    var user = ['d', 's', 'h', 'a', 'r', 'k', 'o'];
    var domain = ['e-notix', 'com'];
    var email = user.join('') + '@' + domain.join('.');
    var number = [6, 8, 7, 6, 5, 1, 6];
    var phone = '+90\u202f534\u202f' + number.slice(0, 3).join('')
      + '\u202f' + number.slice(3, 5).join('') + '\u202f' + number.slice(5).join('');

    function revealContact(container, href, label) {
      var link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      container.replaceChildren(link);
    }

    revealContact(contactEmail, 'mai' + 'lto:' + email, email);
    revealContact(contactPhone, 'https://wa.me/90534' + number.join(''), phone);
    contactStatus.remove();
  }, 5000);
})();
