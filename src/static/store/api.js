import * as recipesEndpoints from './recipes/endpoints'
import * as imageUploaderEndpoints from './imageUploader/endpoints'


const api = ({
  ...recipesEndpoints,
  ...imageUploaderEndpoints,
})


export default api
