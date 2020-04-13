# Warning

At this stage, this is a **highly experimental**, incomplete project.

# Aim 

When writing a server using TypeScript, I want to define the types the server uses, parser/validator checking that the incoming/outgoing data is of the expected format, and OpenAPI documentation.
All at the same time.
Making sure that I never forget either of the parts, and making sure to the parts correspond to each other.

[`io-ts`](https://www.npmjs.com/package/io-ts) can be used to define a data parser and type.
However, it does not define corresponding OpenAPI documentation.

In this project I try to bridge this gap.
