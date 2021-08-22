import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { genreDTO } from 'src/app/genres/genres.model';
import { GenresService } from 'src/app/genres/genres.service';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private genresService: GenresService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  form!: FormGroup;
  genres: genreDTO[] = [];
  movies!: movieDTO[] | null;
  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  totalAmountOfRecords: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false,
    });

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.genresService.getAll().subscribe((genres) => {
      this.genres = genres;
      this.filterMovies(this.form.value);
      this.form.valueChanges.subscribe((values) => {
        this.filterMovies(values);
        this.writeParametersInURL();
      });
    });
  }

  filterMovies(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;

    this.moviesService
      .filter(values)
      .subscribe((response: HttpResponse<movieDTO[]>) => {
        this.movies = response.body;
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  private readParametersFromURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var obj: any = {};

      if (params.title) {
        obj.title = params.title;
      }

      if (params.genreId) {
        obj.genreId = Number(params.genreId);
      }

      if (params.upcomingReleases) {
        obj.upcomingReleases = params.upcomingReleases;
      }

      if (params.inTeaters) {
        obj.inTeaters = params.inTeaters;
      }

      if (params.page) {
        obj.page = params.page;
      }

      if (params.recordsPerPage) {
        obj.recordsPerPage = params.recordsPerPage;
      }

      this.form.patchValue(obj);
    });
  }

  private writeParametersInURL() {
    const queryString = [];
    const formValues = this.form.value;

    if (formValues.title) {
      queryString.push(`title=${formValues.title}`);
    }

    if (formValues.genreId != '0') {
      queryString.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.upcomingReleases) {
      queryString.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }

    if (formValues.inTheaters) {
      queryString.push(`inTheaters=${formValues.inTheaters}`);
    }

    queryString.push(`page=${this.currentPage}`);
    queryString.push(`recordsPerPage=${this.recordsPerPage}`);

    this.location.replaceState('movies/filter', queryString.join('&'));
  }

  paginatorUpdate(event: any) {
    this.currentPage = event.pageIndex +1;
    this.recordsPerPage = event.pageSize;
    this.writeParametersInURL();
    this.filterMovies(this.form.value);
  }

  clearForm() {
    this.form.patchValue(this.initialFormValues);
  }

  onDelete(){
    this.filterMovies(this.form.value);
  }
}
