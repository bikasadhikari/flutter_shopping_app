import 'package:amazon_clone/constants/backend.dart';
import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/utils.dart';
import 'package:amazon_clone/models/user.dart';
import 'package:http/http.dart' as http;

class AuthService {
  //signup user
  void signUpUser({
    required context,
    required name,
    required email,
    required password,
  }) async {
    try {
      User user = User(
        id: '',
        name: name,
        email: email,
        password: password,
        type: '',
        token: '',
      );
      http.Response response = await http.post(
        Uri.parse('$backendUri/signup'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: response,
        context: context,
        onSuccess: () {
          showSnackBar(
              context, 'Account created! Login with the credentials..');
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void signInUser({
    required context,
    required email,
    required password,
  }) async {
    try {
      User user = User(
        id: '',
        name: '',
        email: email,
        password: password,
        type: '',
        token: '',
      );
      http.Response response = await http.post(
        Uri.parse('$backendUri/signin'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
        response: response,
        context: context,
        onSuccess: () {
          showSnackBar(context, 'Login successful..');
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
