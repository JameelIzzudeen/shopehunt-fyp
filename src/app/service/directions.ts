import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class DirectionsService  {
   constructor() {}

  getRoute(origin: any, destination: any): Promise<{ distance: string; duration: string; result: any }> {
    return new Promise((resolve, reject) => {

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result: any, status: any) => {
          if (status === 'OK') {
            const leg = result.routes[0].legs[0];

            resolve({
              distance: leg.distance.text,
              duration: leg.duration.text,
              result: result
            });
          } else {
            reject(status);
          }
        }
      );

    });
  }
}
