export default function ({ $axios }, inject) {
  const api = $axios.create({
    baseURL: 'http://localhost:8080' 
  });

  inject('api', api);
}