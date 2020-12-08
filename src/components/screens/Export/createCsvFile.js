import moment from 'moment';
import stringify from 'csv-stringify/lib/sync';
import { sortByFullName } from '../Overview/logic';

const createCsvFile = (options = {}) => {
  const { days, directoryPersons, userFirstName, userLastName, userCaseId } = options;

  const persons = {};

  const daysSorted = Object.values(days).sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }

    return 0;
  });

  daysSorted.forEach((day) => {
    day.persons.forEach(({ id }) => {
      if (Object.values(persons).find((p) => p.id === id)) {
        persons[id].counter += 1;
        if (day.timestamp > persons[id].lastUsage) {
          persons[id].lastUsage = day.timestamp;
        }
      } else {
        let fullName = '';
        let phoneNumbers = [];
        let emailAddresses = [];
        const directoryPerson = directoryPersons?.find((p) => p.id === id);

        if (directoryPerson) {
          fullName =
            directoryPerson.recordID !== undefined &&
            !!directoryPerson.fullNameDisplay &&
            directoryPerson.fullNameDisplay.trim().length > 0
              ? directoryPerson.fullNameDisplay
              : directoryPerson.fullName;
          phoneNumbers = directoryPerson.phoneNumbers || [];
          emailAddresses = directoryPerson.emailAddresses || [];
        }

        persons[id] = {
          counter: 1,
          fullName,
          id,
          phoneNumbers,
          emailAddresses,
          lastUsage: day.timestamp,
        };
      }
    });
  });

  const personsSorted = Object.values(persons).sort((a, b) => sortByFullName(a, b));

  const outputData = [
    [
      'disease',
      'reportDateTime',
      'lastContactDate',
      'contactIdentificationSource',
      'contactClassification',
      'tracingApp',
      'tracingAppDetails',
      'person.firstName',
      'person.lastName',
      'person.phone',
      'person.emailAddress',
    ],
  ];

  const reportDate = moment().format('DD/MM/YYYY');

  personsSorted.forEach(({ fullName, phoneNumbers, emailAddresses, lastUsage }) => {
    const lastContactDate = moment(lastUsage).format('DD/MM/YYYY');

    const names = fullName.split(' ');
    const firstName = names[0];
    const lastName = names.length > 1 ? names.filter((value, index) => index > 0).join(' ') : '';

    const numbers = [
      ...new Set(
        phoneNumbers
          .map(({ number }) => number.toString().replace(/\s/g, ''))
          .filter((number) => number.trim().length > 0)
      ),
    ];

    const mailAdresses = [
      ...new Set(
        emailAddresses
          .map(({ email }) => email.toString().replace(/\s/g, ''))
          .filter((email) => email.trim().length > 0)
      ),
    ];

    const phone = numbers[0] || '';
    const mail = mailAdresses[0] || '';

    outputData.push([
      'CORONAVIRUS', // disease
      reportDate, // reportDateTime
      lastContactDate, // lastContactDate
      'CASE_PERSON', // contactIdentificationSource
      'CONFIRMED', // contactClassification
      'OTHER', // tracingApp
      'Coronika', // tracingAppDetails
      firstName, // person.firstName
      lastName, // person.lastName
      phone, // person.phone
      mail, // person.emailAddress
    ]);
  });

  const content = stringify(outputData, { delimiter: ';', recordDelimiter: '\r\n', eof: false });

  const filename = `contacts${
    userCaseId.trim().length > 0 ? `_${userCaseId.trim()}` : ''
  }_${userFirstName.trim()}_${userLastName.trim()}.csv`;

  return { content, filename };
};

module.exports = createCsvFile;
