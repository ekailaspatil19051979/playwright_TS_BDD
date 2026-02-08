const { faker } = require('@faker-js/faker');

export class DataFactory {
    static getContactDetails() {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number({ style: 'national' }).replace(/\D/g, '').substring(0, 11), // 11 digits
            subject: faker.lorem.sentence(3),
            message: faker.lorem.paragraph()
        };
    }

    static getBookingDetails() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            totalPrice: faker.number.int({ min: 100, max: 1000 }),
            depositPaid: true,
            checkin: faker.date.soon({ days: 10 }).toISOString().split('T')[0],
            checkout: faker.date.soon({ days: 20 }).toISOString().split('T')[0]
        };
    }
}
