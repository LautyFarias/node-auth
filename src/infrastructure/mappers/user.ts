import { User } from "../../domain/entities/user";
import { HttpError } from "../../domain/errors/http";

/**
 * How is implemented this mapper should be incorrectly.
 * This use way involves that this mapper has to have a lot of considerations, like if the object parameter
 * has id or _id key, re-validate all keys already validated inside DTO and database model, etc.
 *
 * I think that it should be implemented inside MongoDB DataSource
 * or MongoDB domain because it usually is used inside specific DataSource implementation
 * instead of repository implementation or another isolated or abstract module.
 * 
 * Mapper should receive a MongoDB model and return domain entity applying maps and defaults if is necessary.
 */
export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {

    const { _id, name, email, password, roles } = object

    if (!_id) throw HttpError.badRequest("Missing id")
    if (!name) throw HttpError.badRequest("Missing name")
    if (!email) throw HttpError.badRequest("Missing email")
    if (!password) throw HttpError.badRequest("Missing password")
    if (!roles) throw HttpError.badRequest("Missing roles")

    return new User({
      id: _id,
      name,
      email,
      password,
      roles
    })
  }
}
