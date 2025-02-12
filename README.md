# fast-4d-perlin-js
relatively fast 4d perlin noise for javascript.\
i used every value on the dimensions instead of Ken Perlin's improved version's n-1 permutation approach. i thought they looked similar enough, and this was easier to make since i only needed 8 (16 for 4d) different values instead of 12 (wouldve been 32 for 4 dimensions, i believe?).
sadly there are bunch of inline switch cases instead of a function call since turns out its just way faster. i really hope there is a better way to do this without requiring so many hand written switch case statements, honestly...

HOW TO USE:
either call fractalPerlinNoise4d or perlinNoise4d functions with its parameters.\
fractalPerlinNoise4d takes 8 arguments:\
-first 4 are x, y, z, w coordinates,\
-octave count which is how many times perlin noise will be stacked on top of each other,\
-persistence of perlin noise after each octave\
-scale of perlin noise after each octave\
-offset of coordinates of perlin noise after each octave

TODO:
add wrap functionality
