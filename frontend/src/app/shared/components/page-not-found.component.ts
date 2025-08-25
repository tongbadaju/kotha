import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterModule],
  template: `
    <div class="bg-[var(--color-secondary)]">
      <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div class="wf-ull lg:w-1/2">
              <p class="text-sm font-medium text-[var(--color-primary)]">404 error</p>
              <h1 class="mt-3 text-2xl font-semibold text-gray-800">Page not found</h1>
              <p class="mt-4 text-gray-500">Sorry, the page you are looking for doesn't exist.</p>

              <div class="mt-6">
                  <button routerLink="" class="w-1/2 px-5 py-2 text-sm tracking-wide text-white duration-200 bg-[var(--color-primary)] rounded-lg shrink-0 sm:w-auto hover:bg-[var(--color-primary)]/80">
                      Take me home
                  </button>
              </div>
          </div>

          <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
              <img class="w-full max-w-lg lg:mx-auto" src="/images/components/illustration.svg" alt="">
          </div>
      </div>
    </div>
  `
})
export class PageNotFoundComponent {

}
