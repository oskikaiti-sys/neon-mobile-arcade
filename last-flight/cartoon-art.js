/* LAST FLIGHT — original flat-comic SVG character art.
   Stylized fictional illustrations: not photographs or verified likenesses.
   Independent of the game simulator; shared by cockpit, cards and crew strip. */
(function(){
 "use strict";
 const INK="#122b49", BLUE="#28547b", CREAM="#fff7df", GOLD="#ffca3d";
 const STYLE={
  sully:{shape:"round",hair:0,eyes:"kind",mouth:"gentle",glasses:false,brow:"soft",accent:"#f4c958",freckles:false},
  skiles:{shape:"broad",hair:2,eyes:"wide",mouth:"grin",glasses:true,brow:"arched",accent:"#f9c457",freckles:false},
  haynes:{shape:"square",hair:1,eyes:"focused",mouth:"firm",glasses:false,brow:"stern",accent:"#f2ad4f",freckles:false},
  fitch:{shape:"long",hair:3,eyes:"kind",mouth:"smirk",glasses:false,brow:"raised",accent:"#fbd665",freckles:false},
  shults:{shape:"heart",hair:4,eyes:"focused",mouth:"smile",glasses:false,brow:"arched",accent:"#f4c55a",freckles:true},
  piche:{shape:"broad",hair:5,eyes:"focused",mouth:"neutral",glasses:false,brow:"stern",accent:"#f0bf56",freckles:false},
  dejager:{shape:"round",hair:6,eyes:"wide",mouth:"gentle",glasses:false,brow:"soft",accent:"#f8cb5f",freckles:true},
  atchison:{shape:"square",hair:2,eyes:"focused",mouth:"firm",glasses:false,brow:"stern",accent:"#f3c45b",freckles:false},
  lubitz:{shape:"long",hair:5,eyes:"focused",mouth:"neutral",glasses:false,brow:"stern",accent:"#f0bd58",freckles:false},
  records:{shape:"broad",hair:3,eyes:"kind",mouth:"smirk",glasses:true,brow:"soft",accent:"#f3c15a",freckles:false}
 };
 const facePath={
  round:"M52 78Q52 37 112 37Q170 36 171 83L167 136Q163 169 117 178Q67 174 57 136Z",
  broad:"M43 80Q44 39 105 35Q172 30 177 82L171 136Q170 168 119 176Q63 176 49 140Z",
  square:"M54 79Q50 40 108 38Q168 36 172 81L168 151Q153 173 115 174L76 163Q60 152 56 132Z",
  long:"M61 75Q58 30 114 33Q163 29 165 78L163 141Q156 178 116 185Q78 176 67 141Z",
  heart:"M53 79Q47 35 110 33Q173 34 174 82L170 128Q162 163 115 180Q67 160 58 132Z"
 };
 const hairs=[
 // near-bald silver side part
 '<path d="M49 87Q40 45 73 30Q97 20 130 30L153 39Q168 53 169 81L160 70Q132 57 108 61L75 63L54 87Z" fill="{H}" stroke="{I}" stroke-width="5"/><path d="M53 70Q76 41 108 40" fill="none" stroke="#fff2c8" stroke-width="7" stroke-linecap="round"/>',
 // gray brushed back
 '<path d="M51 91Q32 56 67 34Q82 15 110 26Q133 14 156 33Q182 47 168 85L158 67Q140 64 126 50Q102 66 77 62L55 88Z" fill="{H}" stroke="{I}" stroke-width="6"/><path d="M86 41Q108 27 128 35" fill="none" stroke="#ffffff6b" stroke-width="6" stroke-linecap="round"/>',
 // fluffy front spikes
 '<path d="M49 90L37 61L57 64L50 41L74 45L84 23L104 36L129 20L138 38L163 33L171 57L180 72L162 86L156 70Q123 52 103 65L78 59Z" fill="{H}" stroke="{I}" stroke-width="6" stroke-linejoin="round"/>',
 // swept wave
 '<path d="M55 87Q41 53 72 37Q87 20 110 29Q130 16 155 34Q171 44 168 77L151 65Q126 62 103 56Q86 73 58 75Z" fill="{H}" stroke="{I}" stroke-width="6"/><path d="M71 46Q108 28 136 42" fill="none" stroke="#ffffff4f" stroke-width="6" stroke-linecap="round"/>',
 // shoulder-length hair, center swept fringe with open face
 '<path d="M51 77Q40 31 85 22Q137 8 167 48Q181 86 184 169L166 185L155 162L162 86Q149 61 128 54L76 64Q63 84 66 133L56 183L39 167Z" fill="{H}" stroke="{I}" stroke-width="6"/><path d="M52 85Q46 46 81 39Q109 25 140 39Q127 51 97 57Q75 62 61 88Z" fill="{H}" stroke="{I}" stroke-width="5"/>',
 // close cropped hair
 '<path d="M51 91Q42 58 61 39Q75 28 101 32Q133 24 156 45Q171 59 168 82Q153 62 126 61Q92 55 64 75L54 93Z" fill="{H}" stroke="{I}" stroke-width="6"/>',
 // shaggy side part
 '<path d="M51 91Q35 61 53 43L71 42L74 22L93 31L117 22L135 34L156 31L164 52L177 66L163 86L151 68L125 61L106 70L82 61L61 85Z" fill="{H}" stroke="{I}" stroke-width="6" stroke-linejoin="round"/>'
 ];
 function hair(preset,color){
  return hairs[preset].replaceAll("{H}",color).replaceAll("{I}",INK);
 }
 function mouthSvg(type){
  const s='stroke="'+INK+'" stroke-linecap="round" stroke-linejoin="round"';
  if(type==="grin")return '<path d="M91 137Q116 158 139 134Q126 160 111 161Q97 158 91 137Z" fill="#a33e41" '+s+' stroke-width="4"/><path d="M93 136Q115 146 138 135L134 144Q111 150 98 141Z" fill="#fffcef"/>';
  if(type==="gentle")return '<path d="M91 145Q115 154 136 141" fill="none" '+s+' stroke-width="5"/>';
  if(type==="smile")return '<path d="M87 143Q114 159 142 139" fill="none" '+s+' stroke-width="5"/><path d="M126 141L137 138" fill="none" '+s+' stroke-width="3"/>';
  if(type==="smirk")return '<path d="M96 145Q114 149 134 140" fill="none" '+s+' stroke-width="4.5"/><circle cx="134" cy="140" r="2.6" fill="'+INK+'"/>';
  if(type==="firm")return '<path d="M94 148Q113 143 135 146" fill="none" '+s+' stroke-width="5"/>';
  return '<path d="M95 145Q114 146 134 146" fill="none" '+s+' stroke-width="4.5"/>';
 }
 function eyesSvg(p){
  const stern=p.eyes==="focused";
  const eyebrows={
   soft:'<path d="M70 90Q83 84 96 88M124 87Q137 83 149 89" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>',
   arched:'<path d="M69 89Q82 77 96 86M123 86Q138 77 151 89" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>',
   raised:'<path d="M70 86Q84 79 97 86M122 82Q139 75 151 81" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>',
   stern:'<path d="M70 83L98 91M122 91L152 82" fill="none" stroke="'+INK+'" stroke-width="5.5" stroke-linecap="round"/>'
  };
  return eyebrows[p.brow]+
  '<path d="M70 109Q84 '+(stern?103:99)+' 98 110Q86 123 71 112Z M121 110Q137 '+(stern?102:99)+' 152 110Q139 124 123 112Z" fill="#fffef5" stroke="'+INK+'" stroke-width="4" stroke-linejoin="round"/>'+
  '<ellipse cx="87" cy="111" rx="5.5" ry="8" fill="#233f5b"/><ellipse cx="139" cy="111" rx="5.5" ry="8" fill="#233f5b"/>'+
  '<circle cx="88.5" cy="108.5" r="2" fill="#fff"/><circle cx="140.5" cy="108.5" r="2" fill="#fff"/>';
 }
 function glassesSvg(){
  return '<path d="M67 102Q80 98 103 102L103 121Q86 132 70 119Z M117 102Q135 98 155 104L153 119Q136 132 117 119Z M103 105Q110 101 117 105" fill="#abdafb22" stroke="'+INK+'" stroke-width="4.5" stroke-linejoin="round"/>';
 }
 function avatar(p,large){
  const preset=STYLE[p.id]||STYLE.skiles;
  const skin=p.skin||"#e6bb9d",hairColor=p.hair||"#70514c";
  const coat='<path d="M16 247Q17 199 51 185L82 173L113 191L146 173L176 184Q207 197 212 247Z" fill="#fff7e9" stroke="'+INK+'" stroke-width="7" stroke-linejoin="round"/>'+
   '<path d="M17 244Q29 200 49 193L73 199L58 247Z" fill="#c4dae9" stroke="'+INK+'" stroke-width="3"/>'+
   '<path d="M203 244Q189 204 178 194L153 199L166 247Z" fill="#c4dae9" stroke="'+INK+'" stroke-width="3"/>'+
   '<path d="M75 182L111 217L142 181L155 197L127 231L108 245L92 230L63 196Z" fill="#fffdf6" stroke="'+INK+'" stroke-width="4"/>'+
   '<path d="M110 218L119 224L115 246L102 246L102 227Z" fill="#234b76" stroke="'+INK+'" stroke-width="3"/>'+
   '<path d="M23 213L55 190L76 199L56 220L18 231Z M145 199L168 188L198 213L205 232L169 220Z" fill="#203d64" stroke="'+INK+'" stroke-width="4"/>'+
   '<path d="M30 211L60 194M26 219L52 204M165 197L192 216M173 204L198 223" fill="'+GOLD+'" stroke-width="6" stroke-linecap="round"/>';
  const backHair=preset.hair===4?hair(4,hairColor):'';
  const hairfront=preset.hair===4?'':hair(preset.hair,hairColor);
  const face='<path d="'+facePath[preset.shape]+'" fill="'+skin+'" stroke="'+INK+'" stroke-width="7" stroke-linejoin="round"/>'+
    '<path d="M72 123Q79 139 91 145" fill="none" stroke="#bf7968" stroke-width="6" stroke-linecap="round" opacity=".45"/>'+
    '<path d="M144 132Q152 128 158 119" fill="none" stroke="#f7d3b4" stroke-width="7" stroke-linecap="round" opacity=".8"/>';
  // The rear strands render behind the head, while all facial features draw last.
  const features='<path d="M107 116Q106 130 116 131" fill="none" stroke="#b47e6d" stroke-width="4" stroke-linecap="round"/>'+
    eyesSvg(preset)+mouthSvg(preset.mouth)+
    (preset.freckles?'<circle cx="65" cy="133" r="2" fill="#ab7161"/><circle cx="72" cy="136" r="2" fill="#ab7161"/><circle cx="157" cy="135" r="2" fill="#ab7161"/>':'')+
    (preset.glasses?glassesSvg():'');
  const headset=
   '<path d="M49 112Q29 25 107 21Q181 18 181 110" fill="none" stroke="'+INK+'" stroke-width="13" stroke-linecap="round"/>'+
   '<path d="M46 104Q38 35 91 29Q160 16 177 107" fill="none" stroke="#577cad" stroke-width="7" stroke-linecap="round"/>'+
   '<rect x="36" y="100" width="25" height="51" rx="11" fill="#365f94" stroke="'+INK+'" stroke-width="6"/>'+
   '<path d="M43 111L43 141" stroke="#7fadd9" stroke-width="5" stroke-linecap="round"/>'+
   '<rect x="164" y="99" width="25" height="52" rx="12" fill="#365f94" stroke="'+INK+'" stroke-width="6"/>'+
   '<path d="M178 139Q175 167 151 164L140 164" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>'+
   '<rect x="129" y="158" width="17" height="10" rx="5" fill="'+INK+'"/>';
  const clip='comic-face-'+p.id+(large?"-stage":"-card");
  const backdrop=large?'':'<circle cx="111" cy="113" r="106" fill="#ffdf80"/><path d="M16 151Q110 34 209 102" fill="none" stroke="#fff3bd" stroke-width="18" opacity=".7"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 248" role="img" aria-label="原创二维卡通示意人物 '+p.cn+'" preserveAspectRatio="xMidYMax meet">'+
    backdrop+
    '<path d="M91 159L91 185L113 205L134 184L134 159Z" fill="'+skin+'" stroke="'+INK+'" stroke-width="6"/>'+
    backHair+coat+
    '<path d="M51 119Q38 103 40 124Q41 146 57 145M169 118Q183 103 183 127Q182 145 165 146" fill="'+skin+'" stroke="'+INK+'" stroke-width="5"/>'+
    face+hairfront+
    // For the long-haired character a light, non-occluding top fringe sits above eye height.
    (preset.hair===4?'<path d="M54 84Q64 42 102 40Q139 34 166 76L153 79Q123 56 96 65Q74 69 58 91Z" fill="'+hairColor+'" stroke="'+INK+'" stroke-width="5"/>':'')+
    features+headset+
   '</svg>';
 }
 window.LastFlightArt=Object.freeze({avatar,STYLE});
})();