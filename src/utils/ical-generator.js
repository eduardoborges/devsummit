const unindent = require('./unindent');

function timestampToCalDate(timestamp) {
  const date = new Date(timestamp).toISOString();
  return date
    .replace(/[:-]/g, '') // Remove delimiters
    .replace(/\.[0-9]*Z$/, 'Z'); // Remove milliseconds
}

module.exports = function({ name, start, end }) {
  const dtstart = timestampToCalDate(start);
  const dtend = timestampToCalDate(end);
  return unindent(`
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//hacksw/handcal//NONSGML v1.0//EN
    BEGIN:VEVENT
    DTSTAMP:${timestampToCalDate(0)}
    DTSTART:${dtstart}
    DTEND:${dtend}
    SUMMARY:${name}
    UID:${dtstart}-${dtend}@google.com
    END:VEVENT
    END:VCALENDAR
  `)
    .split('\n')
    .join('\r\n');
};
