import Student from "../models/student.js";

export function getStudents(req, res) {
    
    Student.find()
        .then((studentList) => {
            res.json({
                list: studentList
            });
        });
}

export function createStudent(req, res) {
    const student = new Student(req.body);

    student.save()
        .then(() => {
            console.log("Student created");

            res.json({
                message: "Student created"
            });
        })
        .catch((error) => {
            console.log(error);

            res.json({
                message: "Student not created"
            });
        });
}


export function deleteStudent(req, res) {
    Student.deleteOne({ name: req.body.name })
        .then(() => {

            res.json({
                message: "Student deleted successfully"
            });

        })
        .catch((error) => {

            console.log(error);

            res.status(500).json({
                message: "Student deletion failed"
            });

        });
}