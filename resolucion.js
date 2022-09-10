function calcB() {
  var fc=Number(document.getElementById('fc').value);
  var fy=Number(document.getElementById('fy').value);
  var qadm=Number(document.getElementById('qadm').value);
  var rec=Number(document.getElementById('rec').value);
  var a=Number(document.getElementById('a').value);
  var b=Number(document.getElementById('b').value);
  var P=Number(document.getElementById('P').value);
  var Pu=Number(document.getElementById('Pu').value);
  var n=Number(document.getElementById('n').value);
  //Dimensionamiento en planta
  var B1= Math.sqrt(P/(n*qadm));
  B= Math.ceil(B1/ 10)*10;
  document.getElementById('B').value=B;
  var A1= n*B1;
  A= Math.ceil(A1/10)*10;
  document.getElementById('A').value=A;
  var qu=(Pu/(A*B));
  qu=qu.toFixed(4);
  document.getElementById('qu').value=qu;
  document.getElementById('qadm1').value=qadm;
  var outputTex
  if (qu>=qadm) {
    outputText=" cumple!!!";
  }else {
    outputText=" No Cumple!!!";
  }
  document.getElementById('output_text').innerHTML=outputText;
//DIMENSIONAMIENTO EN ELEVACION
//Verificacion a punzonamiento
  var a1=(0.75*4.24*Math.sqrt(fc)/qu)+1;
  var b1=(0.75*2.12*Math.sqrt(fc)/qu+1)*(a+b);
  var c1=a*b-A*B;
  var d1min=(-b1+Math.sqrt(b1*b1-4*a1*c1))/(2*a1);
  d1=d1min.toFixed(3);
  document.getElementById('d_punzonamiento').value=d1;
//Verificacion a corte por flexion
//Sentido x
  var m1=(A-a)/2;
  var m=m1.toFixed(2);
  var qx1=qu*B;
  var qx=qx1.toFixed(2);
  var My1=(qx*m*m)/2;
  var My=My1.toFixed(2);
  var dx1= (qx*m)/(qx1+0.75*B*0.53*Math.sqrt(fc));
  dx=dx1.toFixed(3);
  document.getElementById('m').value=m;
  document.getElementById('qx').value=qx;
  document.getElementById('My').value=My;
  document.getElementById('dx').value=dx;
//sentido y
  var ny1=(B-b)/2;
  var ny=ny1.toFixed(2);
  var qy1=qu*A;
  var qy=qy1.toFixed(2);
  var Mx1=(qy*ny*ny)/2;
  var Mx=Mx1.toFixed(2);
  var dy1= (qy*ny)/(qy1+0.75*A*0.53*Math.sqrt(fc));
  dy=dy1.toFixed(3);
  document.getElementById('ny').value=ny;
  document.getElementById('qy').value=qy;
  document.getElementById('Mx').value=Mx;
  document.getElementById('dy').value=dy;
//Canto util
  dmin=Math.max(d1,dx,dy);
  document.getElementById('dmin').value=dmin;
  h1=dmin+rec;
  h=Math.ceil(h1/5)*5;
  document.getElementById('h').value=h;
  d=h-rec;
  document.getElementById('d').value=d;
//Transferencia de esfuerzos
  var Fa1=Pu/(a*b);
  Fa=Fa1.toFixed(2);
  document.getElementById('Fa').value=Fa;
  var Fau1=0.85*0.65*fc;
  Fau=Fau1.toFixed(2);
  document.getElementById('Fau').value=Fau;
  var cumple2
  if (Fa>=Fau) {
    cumple2=" cumple!!!";
  }else {
    cumple2=" No Cumple!!!";
  }
  document.getElementById('cumple_2').innerHTML=cumple2;
//Calculo del acero por flexión
  //sentido x
  Asx2=((0.85*fc*B)/fy)*(d-Math.sqrt(d*d-((2*My)/(0.9*0.85*fc*B))));
  Asx1=Asx2.toFixed(3);
  document.getElementById('Asx1').value=Asx1;
  Asxmin1=0.0018*B*h;
  Asxmin=Asxmin1.toFixed(3);
  document.getElementById('Asxmin').value=Asxmin;
  Asx=Math.max(Asx1,Asxmin);
  document.getElementById('Asx').value=Asx;
  var fix=document.getElementById('fix').value;
  N1x=Asx/(Math.PI*(fix/20)*(fix/20));
  Nx=Math.ceil(N1x/1)*1;
  document.getElementById('Nx').value=Nx;
  S1x=(B-2*rec)/(Nx-1);
  Sx=Math.floor(S1x)
  document.getElementById('Sx').value=Sx;
  document.getElementById('acero_x').innerHTML='Usar: ⇒  Asx: '+Nx+' ϕ '+fix+'c /'+Sx+' cm';
  document.getElementById('img1').innerHTML=' Asx: '+Nx+' ϕ '+fix+'c /'+Sx+' cm';

  //Sentido y
  Asy2=((0.85*fc*A)/fy)*(d-Math.sqrt(d*d-((2*Mx)/(0.9*0.85*fc*A))));
  Asy1=Asy2.toFixed(3);
  document.getElementById('Asy1').value=Asy1;
  Asymin1=0.0018*A*h;
  Asymin=Asymin1.toFixed(3);
  document.getElementById('Asymin').value=Asymin;
  Asy=Math.max(Asy1,Asymin);
  document.getElementById('Asy').value=Asy;
  var fiy=document.getElementById('fiy').value;
  N1y=Asy/(Math.PI*(fiy/20)*(fiy/20));
  Ny=Math.ceil(N1y/1)*1;
  document.getElementById('Ny').value=Ny;
  S1y=(B-2*rec)/(Ny-1);
  Sy=Math.floor(S1y)
  document.getElementById('Sy').value=Sy;
  document.getElementById('acero_y').innerHTML='Usar: ⇒  Asy: '+Ny+' ϕ '+fiy+'c /'+Sy+' cm';
  document.getElementById('img2').innerHTML=' Asy: '+Ny+' ϕ '+fix+'c /'+Sy+' cm';
//Verificacion por Adherencia
  //sentido x
  Asbx=Math.PI*(Asx/10)*(Asx/10)/4
  ld1x=((0.059*Asbx*fy)/Math.sqrt(fc)).toFixed(2);
  document.getElementById('ld1x').value=ld1x;
  dbx=fiy/10;
  ld2x=((0.0057*dbx*fy)).toFixed(2);
  document.getElementById('ld2x').value=ld2x;
  var ld3x=document.getElementById('ld3x').value;
  ldx=Math.max(ld1x,ld2x,ld3x);
  document.getElementById('ldx').value=ldx;
  document.getElementById('m-rec').value=m-rec;
  document.getElementById('verificacion_en_x').innerHTML=m-rec+'>'+ldx;
  var cumple3
  if (m-rec>=ldx) {
    cumple3=" cumple!!!";
  }else {
    cumple3=" No Cumple!!!";
  }
  document.getElementById('cumple_3').innerHTML=cumple3;

  //sentido y
  Asby=Math.PI*(Asy/10)*(Asy/10)/4
  ld1y=((0.059*Asby*fy)/Math.sqrt(fc)).toFixed(2);
  document.getElementById('ld1y').value=ld1y;
  dby=fix/10;
  ld2y=((0.0057*dby*fy)).toFixed(2);
  document.getElementById('ld2y').value=ld2y;
  var ld3y=document.getElementById('ld3y').value;
  ldy=Math.max(ld1y,ld2y,ld3y);
  document.getElementById('ldy').value=ldy;
  document.getElementById('n-rec').value=ny-rec;
  document.getElementById('verificacion_en_y').innerHTML=ny-rec+'>'+ldy;
  var cumple4
  if (ny-rec>=ldy) {
    cumple4=" cumple!!!";
  }else {
    cumple4=" No Cumple!!!";
  }
  document.getElementById('cumple_4').innerHTML=cumple4;
//Para zapatas rectangulares As3
  As3req=((Asx1-Asy1)/2).toFixed(2);
  document.getElementById('As3req').value=As3req;
  As3min=(0.0018*(A-B)/2*h).toFixed(2);
  document.getElementById('As3min').value=As3min;
  As3=Math.max(As3req,As3min);
  document.getElementById('As3').value=As3;
  var fi3=document.getElementById('fi3').value;
  Nb3=As3/(Math.PI*(fi3/20)*(fi3/20));
  N3=Math.ceil(Nb3/1)*1;
  document.getElementById('N3').value=N3;
  Sb3=((A-B)/2-2*rec)/(N3-1);
  S3=Math.floor(Sb3)
  document.getElementById('S3').value=S3;
  document.getElementById('acero_3').innerHTML='As3: '+N3+' ϕ '+fi3+'c /'+S3+' cm';
  document.getElementById('img3').innerHTML=' As3: '+N3+' ϕ '+fi3+'c /'+S3+' cm';
  if (fc<=0) {
    alert("f'c no puede ser menor o igual a 0")
  }
  if (fy<=0) {
    alert("fy no puede ser menor o igual a 0")
  }
  if (qadm<=0) {
    alert("fy no puede ser menor o igual a 0")
  }
  if (rec<5) {
    alert("el recubrimiento no puede ser menor a 5")
  }
  if (P<=0) {
    alert("P no puede ser menor o igual a 0")
  }
  if (Pu<=0) {
    alert("Pu no puede ser menor o igual a 0")
  }
  if (a<25) {
    alert("a no puede ser menor a 25cm")
  }
  if (b<25) {
    alert("b no puede ser menor a 25cm")
  }
  if (n<=0) {
    alert("n no puede ser menor o igual a 0")
  }

}
