import { Controller, Get, Query } from '@nestjs/common';
import { FakerdataService } from './fakerdata.service';

@Controller('fakerdata')
export class FakerdataController {
    //eslint-disable-next-line
    constructor(private readonly dataService: FakerdataService) {}

    @Get()
    getData(
      @Query('errorRate') errorRate: string,
      @Query('seed') seed: string,
      @Query('region') region: string, 
      @Query('page') page: string,
      @Query('limit') limit: string
    ) {
      const count = parseInt(limit, 10) || 20; // default to 20 if not specified
      const errors = parseFloat(errorRate) || 0;
      const seedValue = parseInt(seed, 10) || Date.now(); // use current time as default seed
      const pageNumber = parseInt(page, 10) || 1;
  
      // Map region to locale
      let locale = 'en_US'; // Default locale
      //console.log('region:', region);
      switch (region?.toLowerCase()) {
        case 'mexico':
          locale = 'es_MX';
          break;
        case 'usa':
          locale = 'en_US';
          break;
        case 'germany':
          locale = 'de';
          break;
        default:
          locale = 'es_MX'; // Default locale
      }
  
      //this.dataService.setSeed(seedValue);
      this.dataService.setLocale(locale, seedValue);
      
      return this.dataService.generateData(count, errors, pageNumber);
    }

}
