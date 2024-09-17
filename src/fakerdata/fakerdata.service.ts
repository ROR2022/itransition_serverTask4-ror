import { Injectable } from '@nestjs/common';
import { Faker, en, es_MX, de } from '@faker-js/faker';

interface DataFakeUser {
    index?: number;
    id: string;
    name: string;
    address: string;
    secondaryAddress: string;
    city: string;
    phone: string;
}

@Injectable()
export class FakerdataService {
    //eslint-disable-next-line 
    private seedValue: number | null = null;
  private locale: string = 'en_US'; // Default locale
  faker: Faker = new Faker(
    {
      locale: [de]
    }
  );
  localeDefinitions={
    'en_US': en,
    'es_MX': es_MX,
    'de': de
  }

    constructor() {
        
        
    }

  setSeed(seed: number) {
    this.seedValue = seed;
    this.faker.seed(seed);
  }

  setLocale(locale: string, seed: number) {
    this.locale = locale;
    //faker.location.country();
    this.faker = new Faker(
        {
          locale: [this.localeDefinitions[locale]]
        }
      );
      this.seedValue = seed;
    this.faker.seed(seed);
      //const getMetadata=this.faker.getMetadata();
    //console.log('Faker Metadata:',getMetadata);
    //console.log('locale:',this.locale);
  }

  generateId() {
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 12; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }

  generateData(recordCount: number, errorRate: number, page: number) {
    const records = [];
    const startIndex = (page - 1) * recordCount;
    const endIndex = startIndex + recordCount;
    
    for (let i = startIndex; i < endIndex; i++) {
      let record:DataFakeUser = {
        index: (i+1)+(page-1)*recordCount,
        id: this.generateId(),
        name: this.faker.person.fullName(),
        address: this.faker.location.streetAddress(),
        secondaryAddress: this.faker.location.secondaryAddress(),
        city: this.faker.location.city(),
        phone: this.faker.phone.number(),
      };
      
      // Introduce errors based on errorRate
      if (errorRate > 0) {
        record = this.introduceErrors(record, errorRate);
      }
      
      records.push(record);
    }

    return records;
  }

  private introduceErrors(record: any, errorRate: number) {
    const fields = ['name', 'address', 'phone', 'city', 'secondaryAddress'];
    const numberOfErrors = Math.round(errorRate)*10;
    //Support 3 type of errors 
    //- delete character in random position, 
    //add random character (from a proper alphabet) in random position, 
    //swap near characters.
    //console.log('numberOfErrors:',numberOfErrors);
    for (let i = 0; i < numberOfErrors; i++) {
      const fieldToError = fields[Math.floor(Math.random() * fields.length)];
        const fieldLength = record[fieldToError].length;
        const errorIndex = Math.floor(Math.random() * fieldLength);
        const errorType = Math.floor(Math.random() * 3);
        let errorChar = '';
        switch (errorType) {
          case 0: // Delete character
            record[fieldToError] = record[fieldToError].slice(0, errorIndex) + record[fieldToError].slice(errorIndex + 1);
            break;
          case 1: // Add character
            errorChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
            record[fieldToError] = record[fieldToError].slice(0, errorIndex) + errorChar + record[fieldToError].slice(errorIndex);
            break;
          case 2: // Swap characters
            if (errorIndex < fieldLength - 1) {
              const charArray = record[fieldToError].split('');
              const temp = charArray[errorIndex];
              charArray[errorIndex] = charArray[errorIndex + 1];
              charArray[errorIndex + 1] = temp;
              record[fieldToError] = charArray.join('');
            }
            break;
          default:
            break;
        }
    }

    return record;
  }
}
