import { Component, OnInit } from '@angular/core';
import { Country, Region } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [] as Country[];
  regions: Region[] = [] as Region[];
  errorMessage: string | undefined;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getAllRegions().subscribe((data) => {
      this.regions = data;
    }, (error) => {
      this.errorMessage = error;
    });
    this.countryService.getAllCountries().subscribe((data) => {
      this.countries = data;
    }, (error) => {
      this.errorMessage = error;
    });
  }

  getRegion(code: string): string {
    let region: Region = this.regions.filter(t => t.code === code)[0];
    return region.name;
  }
}
