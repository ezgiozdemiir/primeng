import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from '../country'
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import {FilterService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent implements OnInit{

  //Variables are initiliazed in this part to be known inside of methods.
  countries: Country[] = [];
  loading: boolean = true;
  regions: {region?: string}[] = [];
  filteredCountries: Country[] = [];
  filterByArea!: boolean;
  sortedColumn: string = '';
  sortDirection: string = 'asc';
  lithuaniaArea!: number;
  isOceaniaOnly: boolean = false;
  isLessThanLithuania: boolean = false;

  @ViewChild('dt') table!: Table;

  //Needed services are defined in constructor.
  constructor(
    private primengConfig: PrimeNGConfig,
    private filterService: FilterService,
    private http: HttpClient
  ) {}

  //In ngOnInit() data are getted from the given url and data sets are determined.
  ngOnInit() {
    this.http
      .get<Country[]>('https://restcountries.com/v2/all?fields=name,region,area')
      .subscribe(data => {
        this.countries = data;    
          const regionss = data.map(country => country.region);
          this.regions = [...new Set(regionss.filter((region, index, array) => array.indexOf(region) !== index))]
          .map(region => ({ region }));

          this.filteredCountries = this.countries;
          console.log(this.regions)

          const lithuania = this.countries.find(country => country.name === 'Lithuania');
          if (lithuania) {
            this.lithuaniaArea = lithuania.area;
          }
          return this.regions;
      })
     
      this.loading = false;
      console.log(this.regions)

      const customFilterName = 'custom-equals';

      //This method filters the columns.
      this.filterService.register(customFilterName, (value: { toString: () => any; } | null | undefined | EventTarget, filter: string | null | undefined): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

      if (value === undefined || value === null) {
        return false;
      }

      return value.toString() === filter.toString();
    });
    
    this.primengConfig.ripple = true;

  }

  //This method clears filters which are filtered in related columns.
  clear(table: Table) {
    table.clear();
  }

  //This method is for filtering with specific filters via checkboxes. Specific filters shows only Oceania regions and countries whose area less than Lithuanis's.
  updateFilteredCountries() {
    let filteredCountries = this.countries;

    if (this.isOceaniaOnly) {
      filteredCountries = filteredCountries.filter(country => country.region === 'Oceania');
    }

    if (this.isLessThanLithuania && this.lithuaniaArea) {
      filteredCountries = filteredCountries.filter(country => country.area < this.lithuaniaArea);
    }

    this.filteredCountries = filteredCountries;
  }
}
