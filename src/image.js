import {Permissions, ImagePicker} from 'expo'

export async function accessCameraRoll() {
  const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

  return status === 'granted'
}

export async function selectCameraRollImage() {
  const {base64, cancelled, type, uri, ...rest} = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
  })

  return cancelled ? null : `data:${type}/${uri.match(/^.*(\.[^\.]+)$/)[1]};base64,${base64}`
}
