import 'package:flutter/material.dart';

class MyColors {
  static const appBarGradient = LinearGradient(colors: [
    Color.fromARGB(255, 29, 201, 192),
    Color.fromARGB(255, 125, 221, 216),
  ], stops: [
    0.5,
    1.0
  ]);

  static const secondaryColor = Color.fromRGBO(255, 153, 0, 1);
  static const backgroundColor = Color.fromRGBO(255, 255, 255, 1.0);
  static const Color greyBackgroundColor = Color(0xffebecee);
  static const Color selectedNavbarColor = Color(0xFF00838F);
  static const Color unSelectedNavbarColor = Color(0xDD000000);
}
