export default function({ $axios, redirect }, inject) {
    // request interceptor
    $axios.interceptors.request.use(
        config => {
          // do something before request is sent
          return config;
      },
      error => {
          // do something with request error
          return Promise.reject(error);
      }
      );
      $axios.onRequest(config => {
          console.log("Making request to " + config.url);
      });
      
      // response interceptor
      $axios.interceptors.response.use(
          /**
           * Determine the request status by custom code
           * Here is just an example
           * You can also judge the status by HTTP Status Code
           */
          response => {
          const res = response.data;
          if (res.status === 0) {
              return res;
          } else {
            //  redirect("/404");
              // if the custom code is not 200, it is judged as an error.
          }
          return Promise.reject(new Error(res.message || "Error"));
      },
      error => {
          console.log("err" + error); // for debug
          
          return Promise.reject(error);
      }
      );
      
      $axios.onError(error => {
          const status = parseInt(error.response && error.response.status);
      if (status === 400) {
        redirect("/404");
      } else if (status === 500) {
        redirect("/500");
      }
    });
  }