import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Country, Region } from 'src/app/interfaces/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  countryCode: string | null = '';
  country: Country = {} as Country;
  region: Region = {} as Region;
  errorMessage : string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.countryCode = param.get('code');
    });

    this.countryService.getAllCountries().subscribe((data) => {
      let countries: Country[] = data;
      let selectedCountry = countries.find(country => country.code === this.countryCode);
      if(selectedCountry) {
        this.country = selectedCountry;
        this.countryService.getAllRegions().subscribe((data) => {
          let regions: Region[] = data;
          let selectedRegion = regions.find(
            region => region.code === this.country.region
          );
          if(selectedRegion) {
            this.region = selectedRegion;
          }
        });
      }
    });
  }

  isNotEmpty(): boolean {
    return Object.keys(this.country).length > 0;
  }
}
