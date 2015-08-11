function loadShader(gl, id){
    var shader;
    var shaderScript;
    var shaderSource;

    shaderScript = document.getElementById(id);
    shaderSource = shaderScript.text;
    if (shaderScript.type == "x-shader/x-vertex"){
	shader = gl.createShader(gl.VERTEX_SHADER);
    } else if (shaderScript.type == "x-shader/x-fragment"){
	shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else {
	console.log(shaderScript.type);
    }
    gl.shaderSource(shader, shaderSource); 
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
	console.log("Shader did not compile: " + gl.getShaderInfoLog(shader));
	return null;
    }
    
    return shader;
}

function draw_2d_program_1(gl){
    var v_shader = loadShader(gl, "2d-vertex-shader");
    var f_shader = loadShader(gl, "2d-fragment-shader");

    var gl_program = gl.createProgram();
    gl.attachShader(gl_program, v_shader);
    gl.attachShader(gl_program, f_shader);
    gl.linkProgram(gl_program);

    if (!gl.getProgramParameter(gl_program, gl.LINK_STATUS)){
	console.log("Shaders did not link: " + gl.getProgramInfoLog(gl_program));
    }

    gl.useProgram(gl_program);

    gl.viewport(0, 0, gl.canvasWidth, gl.canvasHeight);
    gl.clear(gl.COLOR_BUFFET_BIT | gl.DEPTH_BUFFER_BIT);

    var positionLocation = gl.getAttribLocation(gl_program, "a_position");
    gl.enableVertexAttribArray(positionLocation);

    var vertexColor = gl.getAttribLocation(gl_program, "a_vertex_color");
    gl.enableVertexAttribArray(vertexColor);

    var resolutionLocation = gl.getUniformLocation(gl_program, "u_resolution");
    gl.uniform2f(resolutionLocation, gl.canvasWidth, gl.canvasHeight);

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(
	gl.ARRAY_BUFFER,
	new Float32Array(
	[
	//0, 0 , //bottom left
	0, 300, //center left
	//0, 600, //top left 
	400, 300, //center
	400, 0, //bottom center
	//400, 0, //bottom right
	400, 600, //top center
	400, 300, //center
	800, 300, //center right
	//800, 0, //bottom right
	0, 0
	]
	),
	gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var fragment_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fragment_buffer);
    gl.bufferData(
	gl.ARRAY_BUFFER,
	new Float32Array(
	[
	1, 0 , 0, 1, //red
	//0, 1, 0, 1, //green
	1, 1, 0, 1, //yellow
	//0, 1, 1, 1, //turqoise
	1, 0, 1, 1, //purple
	//0, 1, 0, 1, //green
	//0, 1, 1, 1, //turqoise
	1, 0 , 0, 1, //red
	1, 1, 0, 1, //yellow
	1, 0, 1, 1, //purple
	//0, 0, 0, 1, //black
	//1, 1, 1, 1, //white
	0, 0, 0, 0 //nothing, alpha = 0
	]
	),
	gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);

    //draw a triangle using the data from vertex_buffer and fragment_buffer
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function draw_3d_program_1(gl){
    var v_shader = loadShader(gl, "3d-vertex-shader");
    var f_shader = loadShader(gl, "3d-fragment-shader");

    var pMatrix = mat4.create();
    mat4.identity(pMatrix);
    console.log(pMatrix);

    var gl_program = gl.createProgram();
    gl.attachShader(gl_program, v_shader);
    gl.attachShader(gl_program, f_shader);
    gl.linkProgram(gl_program);

    if (!gl.getProgramParameter(gl_program, gl.LINK_STATUS)){
	console.log("Shaders did not link: " + gl.getProgramInfoLog(gl_program));
    }

    gl.useProgram(gl_program);

    gl.clearColor(0, 0, 0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, gl.canvasWidth, gl.canvasHeight);
    gl.clear(gl.COLOR_BUFFET_BIT | gl.DEPTH_BUFFER_BIT);
}


function main(){
    canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");
    gl.canvasWidth = canvas.width;
    gl.canvasHeight = canvas.height;
    if (!gl){
	console.log("Ayy lmao");
	return;
    }
    if (0){
	draw_2d_program_1(gl);
    } else {
	draw_3d_program_1(gl);
    }
}

window.onload = main;
