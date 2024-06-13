import { Roles } from "./enums";

export const isStudent = function () {
  return this.role === Roles.STUDENT;
};

export const isTeacher = function () {
  return this.role === Roles.TEACHER;
};