if (MESSAGE_OUTDATED_BROWSER) {
    var $buoop = {vs:{i:8,f:31,o:12.1,s:5.1}, text:MESSAGE_OUTDATED_BROWSER};
}
else {
    var $buoop = {vs:{i:8,f:31,o:12.1,s:5.1}};
}

// This is a local copy, because this file is not minified on CDN

//browser-update.org notification script, <browser-update.org>
//Copyright (c) 2007-2014, MIT Style License <browser-update.org/LICENSE.txt>
//It is RECOMMEDED to directly link to this file and not to use a local copy
//because we update and maintain the detection code
var $buo = function(op,test) {
var jsv=14;
var n = window.navigator,b;
this.op=op||{};
//options
this.op.l = op.l||n["language"]||n["userLanguage"]||document.documentElement.getAttribute("lang")||"en";
var ll=this.op.l.substr(0,2);
this.op.vsakt = {i:11,f:28,o:12.1,s:7,n:20,c:32};
//this.op.vsdefault = {i:8,f:10,o:12,s:5,n:10};
this.op.vsdefault = {i:8,f:23,o:12,s:5.2,n:12,c:28};
this.op.vsmin={i:7,f:5,o:12,s:5,n:10,c:28};
var myvs=op.vs||{};
this.op.vs =op.vs||this.op.vsdefault;
for (b in this.op.vsakt) {
    if (this.op.vs[b]>=this.op.vsakt[b])
        this.op.vs[b]=this.op.vsakt[b]-0.2;
    if (!this.op.vs[b])
        this.op.vs[b]=this.op.vsdefault[b];
    if (this.op.vs[b]<this.op.vsmin[b])
        this.op.vs[b]=this.op.vsmin[b];      
}
if (op.reminder<0.1 || op.reminder===0)
    this.op.reminder=0;
else
    this.op.reminder=op.reminder||24;

this.op.onshow = op.onshow||function(o){};
this.op.onclick = op.onclick||function(o){};
this.op.url= op.url||"http://browser-update.org/update-browser.html#"+jsv+"@"+(location.hostname||"x");
if (op.l)
	this.op.url= op.url||"http://browser-update.org/"+ll+"/update-browser.html#"+jsv+"@"+(location.hostname||"x");
this.op.pageurl = op.pageurl || window.location.hostname || "unknown";
this.op.newwindow=(op.newwindow!==false);

this.op.test=test||op.test||false;
if (window.location.hash=="#test-bu")
    this.op.test=true;


if (op.exp || (ll==="en" && !this.op.test && Math.round(Math.random()*200)<1)) { //test new script
     var e = document.createElement("script");
     e.setAttribute("type", "text/javascript");
     e.setAttribute("src", "//browser-update.org/updatex.js");
     document.body.appendChild(e);
     return;
}


function getBrowser() {
    var n,v,t,ua = navigator.userAgent;
    var names={i:'Internet Explorer',f:'Firefox',o:'Opera',s:'Apple Safari',n:'Netscape Navigator', c:"Chrome", x:"Other"};
    if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|maxthon|maxton|mediapartners|dolfin|dolphin|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(ua)) n="x";
    else if (/Trident.*rv:(\d+\.\d+)/i.test(ua)) n="i";
    else if (/Trident.(\d+\.\d+)/i.test(ua)) n="io";
    else if (/MSIE.(\d+\.\d+)/i.test(ua)) n="i";
    else if (/OPR.(\d+\.\d+)/i.test(ua)) n="o";
    else if (/Chrome.(\d+\.\d+)/i.test(ua)) n="c";
    else if (/Firefox.(\d+\.\d+)/i.test(ua)) n="f";
    else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua))	n="s";
    else if (/Safari.(\d+)/i.test(ua)) n="so";
    else if (/Opera.*Version.(\d+\.\d+)/i.test(ua)) n="o";
    else if (/Opera.(\d+\.?\d+)/i.test(ua)) n="o";
    else if (/Netscape.(\d+)/i.test(ua)) n="n";
    else return {n:"x",v:0,t:names[n]};
    
    var v= parseFloat(RegExp.$1);
    var donotnotify=false;
    //do not notify ver old systems since their is no up-to-date browser available
    if (/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(ua)) donotnotify="oldOS";
    
    //do not notify firefox ESR
    if (n=="f" && Math.round(v)==24)
        donotnotify="ESR";
    //do not notify opera 12 on linux since it is the latest version
    if (/linux|x11|unix|bsd/.test(ua) && n=="o" && v>12) 
        donotnotify="Opera12Linux";
    
    if (n=="x") return {n:"x",v:v||0,t:names[n],donotnotify:donotnotify};
    

    if (n=="so") {
        v=((v<100) && 1.0) || ((v<130) && 1.2) || ((v<320) && 1.3) || ((v<520) && 2.0) || ((v<524) && 3.0) || ((v<526) && 3.2) ||4.0;
        n="s";
    }
    if (n=="i" && v==7 && window.XDomainRequest) {
        v=8;
    }
    if (n=="io") {
        n="i";
        if (v>6) v=11;
        else if (v>5) v=10;
        else if (v>4) v=9;
        else if (v>3.1) v=8;
        else if (v>3) v=7;
        else v=9;
    }	
    return {n:n,v:v,t:names[n]+" "+v,donotnotify:donotnotify};
}

this.op.browser=getBrowser();
if (!this.op.test && (!this.op.browser || !this.op.browser.n || this.op.browser.n=="x" || this.op.browser.donotnotify!==false || document.cookie.indexOf("browserupdateorg=pause")>-1 || this.op.browser.v>this.op.vs[this.op.browser.n]))
    return;


if (!this.op.test  && Math.round(Math.random()*100)<1) {
    var i = new Image();
    i.src="//browser-update.org/viewcount.php?n="+this.op.browser.n+"&v="+this.op.browser.v + "&p="+ escape(this.op.pageurl) + "&jsv="+jsv+"&vs="+myvs.i+","+myvs.f+","+myvs.o+","+myvs.s;
}
if (this.op.reminder>0) {
    var d = new Date(new Date().getTime() +1000*3600*this.op.reminder);
    document.cookie = 'browserupdateorg=pause; expires='+d.toGMTString()+'; path=/';
}

var languages = "xx,jp,sl,id,uk,rm,da,ca,sv,hu,fa,gl";
if (languages.indexOf(ll)>0)
    this.op.url="http://browser-update.org/update.html#"+jsv+"@"+(location.hostname||"x");
var tar="";
if (this.op.newwindow)
    tar=' target="_blank"';

function busprintf() {
    var args=arguments;
    var data = args[ 0 ];
    for( var k=1; k<args.length; ++k ) {
        data = data.replace( /%s/, args[ k ] );
    }
    return data;
}

var t = 'This website would like to remind you: Your browser (%s) is <b>out of date</b>.\
         <a%s>Update your browser</a> for more security, comfort and the best experience on this site.';
if (ll=="de")
    t = 'Sie verwenden einen <b>veralteten Browser</b> (%s) mit <b>Sicherheitsschwachstellen</b> und <b>k&ouml;nnen nicht alle Funktionen dieser Webseite nutzen</b>. \
        <a%s>Hier erfahren Sie, wie einfach Sie Ihren Browser aktualisieren k&ouml;nnen</a>.';
else if (ll=="it")
    t = 'Il tuo browser (%s) <b>non Ã¨ aggiornato</b>. Ha delle <b>falle di sicurezza</b> e potrebbe <b>non visualizzare correttamente</b> le \
        pagine di questo e altri siti. \
        <a%s>Aggiorna il tuo browser</a>!';
else if (ll=="pl")
    t = 'PrzeglÄ…darka (%s), ktÃ³rej uÅ¼ywasz, jest przestarzaÅ‚a. Posiada ona udokumentowane <b>luki bezpieczeÅ„stwa, inne wady</b> oraz <b>ograniczonÄ… funkcjonalnoÅ›Ä‡</b>. Tracisz moÅ¼liwoÅ›Ä‡ skorzystania z peÅ‚ni moÅ¼liwoÅ›ci oferowanych przez niektÃ³re strony internetowe. <a%s>Dowiedz siÄ™ jak zaktualizowaÄ‡ swojÄ… przeglÄ…darkÄ™</a>.';
else if (ll=="es")
    t = 'Su navegador (%s) <b>no estÃ¡ actualizado</b>. Tiene <b>fallos de seguridad</b> conocidos y podrÃ­a <b>no mostrar todas las caracterÃ­sticas</b> de este y otros sitios web. <a%s>AverigÃ¼e cÃ³mo actualizar su navegador.</a>';
else if (ll=="nl")
    t = 'Uw browser (%s) is <b>oud</b>. Het heeft bekende <b>veiligheidsissues</b> en kan <b>niet alle mogelijkheden</b> weergeven van deze of andere websites. <a%s>Lees meer over hoe uw browser te upgraden</a>';
else if (ll=="pt")
    t = 'Seu navegador (%s) estÃ¡ <b>desatualizado</b>. Ele possui <b>falhas de seguranÃ§a</b> e pode <b>apresentar problemas</b> para exibir este e outros websites. <a%s>Veja como atualizar o seu navegador</a>';
else if (ll=="sl")
    t = 'VaÅ¡ brskalnik (%s) je <b>zastarel</b>. Ima veÄ <b>varnostnih pomankljivosti</b> in morda <b>ne bo pravilno prikazal</b> te ali drugih strani. \
        <a%s>Poglejte kako lahko posodobite svoj brskalnik</a>';
else if (ll=="ru")
    t = 'Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€ (%s) <b>ÑƒÑÑ‚Ð°Ñ€ÐµÐ»</b>. ÐžÐ½ Ð¸Ð¼ÐµÐµÑ‚ <b>ÑƒÑÐ·Ð²Ð¸Ð¼Ð¾ÑÑ‚Ð¸ Ð² Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸</b> Ð¸ Ð¼Ð¾Ð¶ÐµÑ‚ <b>Ð½Ðµ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ Ð²ÑÐµ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸</b> Ð½Ð° ÑÑ‚Ð¾Ð¼ Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ñ… ÑÐ°Ð¹Ñ‚Ð°Ñ…. <a%s>Ð£Ð·Ð½Ð°Ð¹Ñ‚Ðµ, ÐºÐ°Ðº Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€</a>';
else if (ll=="id")
    t = 'Browser Anda (% s) sudah <b>kedaluarsa</b>. Browser yang Anda pakai memiliki <b>kelemahan keamanan</b> dan mungkin <b>tidak dapat menampilkan semua fitur</b> dari situs Web ini dan lainnya. <a%s> Pelajari cara memperbarui browser Anda</a>';
else if (ll=="uk")
    t = 'Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€ (%s) <b>Ð·Ð°ÑÑ‚Ð°Ñ€Ñ–Ð²</b>. Ð’Ñ–Ð½ <b>ÑƒÑ€Ð°Ð·Ð»Ð¸Ð²Ð¸Ð¹</b> Ð¹ Ð¼Ð¾Ð¶Ðµ <b>Ð½Ðµ Ð²Ñ–Ð´Ð¾Ð±Ñ€Ð°Ð¶Ð°Ñ‚Ð¸ Ð²ÑÑ– Ð¼Ð¾Ð¶Ð»Ð¸Ð²Ð¾ÑÑ‚Ñ–</b> Ð½Ð° Ñ†ÑŒÐ¾Ð¼Ñƒ Ð¹ Ñ–Ð½ÑˆÐ¸Ñ… ÑÐ°Ð¹Ñ‚Ð°Ñ…. <a%s>Ð”Ñ–Ð·Ð½Ð°Ð¹Ñ‚ÐµÑÑŒ, ÑÐº Ð¾Ð½Ð¾Ð²Ð¸Ñ‚Ð¸ Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€</a>';
else if (ll=="ko")
    t = 'ì§€ê¸ˆ ì‚¬ìš©í•˜ê³  ê³„ì‹  ë¸Œë¼ìš°ì €(%s)ëŠ” <b>ì˜¤ëž˜ë˜ì—ˆìŠµë‹ˆë‹¤.</b> ì•Œë ¤ì§„ <b>ë³´ì•ˆ ì·¨ì•½ì </b>ì´ ì¡´ìž¬í•˜ë©°, ìƒˆë¡œìš´ ì›¹ ì‚¬ì´íŠ¸ê°€ <b>ê¹¨ì ¸ ë³´ì¼ ìˆ˜ë„</b> ìžˆìŠµë‹ˆë‹¤. <a%s>ë¸Œë¼ìš°ì €ë¥¼ ì–´ë–»ê²Œ ì—…ë°ì´íŠ¸í•˜ë‚˜ìš”?</a>';
else if (ll=="rm")
    t = 'Tes navigatur (%s) Ã¨ <b>antiquÃ </b>. El cuntegna <b>problems da segirezza</b> enconuschents e mussa eventualmain <b>betg tut las funcziuns</b> da questa ed autras websites. <a%s>Emprenda sco actualisar tes navigatur</a>.';
else if (ll=="ja")	
	t = 'ãŠä½¿ã„ã®ãƒ–ãƒ©ã‚¦ã‚¶ã€Œ%sã€ã¯ã€<b>æ™‚ä»£é…ã‚Œ</b>ã®ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã§ã™ã€‚æ—¢çŸ¥ã®<b>è„†å¼±æ€§</b>ãŒå­˜åœ¨ã™ã‚‹ã°ã‹ã‚Šã‹ã€<b>æ©Ÿèƒ½ä¸è¶³</b>ã«ã‚ˆã£ã¦ã€ã‚µã‚¤ãƒˆãŒæ­£å¸¸ã«è¡¨ç¤ºã§ããªã„å¯èƒ½æ€§ãŒã‚ã‚Šã¾ã™ã€‚ \
         <a%s>ãƒ–ãƒ©ã‚¦ã‚¶ã‚’æ›´æ–°ã™ã‚‹æ–¹æ³•ã‚’ç¢ºèªã™ã‚‹</a>';
else if (ll=="fr")
	t = 'Votre navigateur (%s) est <b>pÃ©rimÃ©</b>. Il contient des <b>failles de sÃ©curitÃ©</b> et pourrait <b>ne pas afficher certaines fonctionalitÃ©s</b> des sites internet rÃ©cents. <a%s>DÃ©couvrez comment mettre votre navigateur Ã  jour</a>';
else if (ll=="da")
        t = 'Din browser (%s) er <b>for&aelig;ldet</b>. Den har kendte <b>sikkerhedshuller</b> og kan m&aring;ske <b>ikke vise alle funktioner</b> p&aring; dette og andre websteder. <a%s>Se hvordan du opdaterer din browser</a>';
else if (ll=="sq")
        t = 'Shfletuesi juaj (%s) Ã«shtÃ« <b>ca i vjetÃ«r</b>. Ai ka <b>tÃ« meta sigurie</b> tÃ« njohura dhe mundet tÃ« <b>mos i shfaqÃ« tÃ« gjitha karakteristikat</b> e kÃ«saj dhe shumÃ« faqeve web tÃ« tjera. <a%s>MÃ«soni se si tÃ« pÃ«rditÃ«soni shfletuesin tuaj</a>';
else if (ll=="ca")
        t = 'El teu navegador (%s) estÃ  <b>desactualitzat</b>. TÃ© <b>vulnerabilitats</b> conegudes i pot <b>no mostrar totes les caracterÃ­stiques</b> d\'aquest i altres llocs web. <a%s>AprÃ¨n a actualitzar el navegador</a>';
else if (ll=="tr")
    t = 'TarayÄ±cÄ±nÄ±z (%s) <b>gÃ¼ncel deÄŸildir.</b>. Eski versiyon olduÄŸu iÃ§in <b>gÃ¼venlik aÃ§Ä±klarÄ±</b> vardÄ±r ve gÃ¶rmek istediÄŸiniz bu web sitesinin ve diÄŸer web sitelerinin <b>tÃ¼m Ã¶zelliklerini hatasÄ±z bir ÅŸekilde</b> gÃ¶steremeyecektir. \
         <a%s>TarayÄ±cÄ±nÄ±zÄ± nasÄ±l gÃ¼ncelleyeceÄŸinizi Ã¶ÄŸrenin!</a>';
else if (ll=="fa")
    t = 'Ù…Ø±ÙˆØ±Ú¯Ø± Ø´Ù…Ø§ (%s) <b>Ø§Ø² Ø±Ø¯Ù‡ Ø®Ø§Ø±Ø¬ Ø´Ø¯Ù‡</b> Ù…ÛŒ Ø¨Ø§Ø´Ø¯. Ø§ÛŒÙ† Ù…Ø±ÙˆØ±Ú¯Ø± Ø¯Ø§Ø±Ø§ÛŒ <b>Ù…Ø´Ú©Ù„Ø§Øª Ø§Ù…Ù†ÛŒØªÛŒ Ø´Ù†Ø§Ø®ØªÙ‡ Ø´Ø¯Ù‡</b> Ù…ÛŒ Ø¨Ø§Ø´Ø¯ Ùˆ <b>Ù†Ù…ÛŒ ØªÙˆØ§Ù†Ø¯ ØªÙ…Ø§Ù…ÛŒ ÙˆÛŒÚ˜Ú¯ÛŒ Ù‡Ø§ÛŒ Ø§ÛŒÙ†</b> ÙˆØ¨ Ø³Ø§ÛŒØª Ùˆ Ø¯ÛŒÚ¯Ø± ÙˆØ¨ Ø³Ø§ÛŒØª Ù‡Ø§ Ø±Ø§ Ø¨Ù‡ Ø®ÙˆØ¨ÛŒ Ù†Ù…Ø§ÛŒØ´ Ø¯Ù‡Ø¯. \
         <a%s>Ø¯Ø± Ø®ØµÙˆØµ Ú¯Ø±ÙØªÙ† Ø±Ø§Ù‡Ù†Ù…Ø§ÛŒÛŒ Ø¯Ø±Ø®ØµÙˆØµ Ù†Ø­ÙˆÙ‡ ÛŒ Ø¨Ù‡ Ø±ÙˆØ² Ø±Ø³Ø§Ù†ÛŒ Ù…Ø±ÙˆØ±Ú¯Ø± Ø®ÙˆØ¯ Ø§ÛŒÙ†Ø¬Ø§ Ú©Ù„ÛŒÚ© Ú©Ù†ÛŒØ¯.</a>';
else if (ll=="sv")
    t = 'Din webblÃ¤sare (%s) Ã¤r <b>fÃ¶rÃ¥ldrad</b>. Den har kÃ¤nda <b>sÃ¤kerhetshÃ¥l</b> och <b>kan inte visa alla funktioner korrekt</b> pÃ¥ denna och pÃ¥ andra webbsidor. <a%s>Uppdatera din webblÃ¤sare idag</a>';
else if (ll=="hu")
    t = 'Az Ã–n bÃ¶ngÃ©szÅ‘je (%s) <b>elavult</b>. Ismert <b>biztonsÃ¡gi hiÃ¡nyossÃ¡gai</b> vannak Ã©s esetlegesen <b>nem tud minden funkciÃ³t megjelenÃ­teni</b> ezen vagy mÃ¡s weboldalakon. <a%s>Itt talÃ¡l bÅ‘vebb informÃ¡ciÃ³t a bÃ¶ngÃ©szÅ‘jÃ©nek frissÃ­tÃ©sÃ©vel kapcsolatban</a>		 ';
else if (ll=="gl")
    t = 'O seu navegador (%s) estÃ¡ <b>desactualizado</b>. Ten coÃ±ecidos <b>fallos de seguranza</b> e poderÃ­a <b>non mostrar tÃ³dalas caracterÃ­sticas</b> deste e outros sitios web. <a%s>Aprenda como pode actualizar o seu navegador</a>';
else if (ll=="cs")
    t = 'VÃ¡Å¡ prohlÃ­Å¾eÄ (%s) je <b>zastaralÃ½</b>. Jsou znÃ¡my <b>bezpeÄnostnÃ­ rizika</b> a moÅ¾nÃ¡ <b>nedokÃ¡Å¾e zobrazit vÅ¡echny prvky</b> tÃ©to a dalÅ¡Ã­ch webovÃ½ch strÃ¡nek. <a%s>NauÄte se, jak aktualizovat svÅ¯j prohlÃ­Å¾eÄ</a>';
else if (ll=="he")
    t = '×”×“×¤×“×¤×Ÿ ×©×œ×š (%s) <b>××™× ×• ×ž×¢×•×“×›×Ÿ</b>. ×™×© ×œ×• <b>×‘×¢×™×•×ª ××‘×˜×—×” ×™×“×•×¢×•×ª</b> ×•×¢×©×•×™ <b>×œ× ×œ×”×¦×™×’ ××ª ×›×œ ×”×ª×›×•× ×•×ª</b> ×©×œ ××ª×¨ ×–×” ×•××ª×¨×™× ××—×¨×™×. <a%s>×œ×ž×“ ×›×™×¦×“ ×œ×¢×“×›×Ÿ ××ª ×”×“×¤×“×¤×Ÿ ×©×œ×š</a>';
else if (ll=="nb")
    t='Nettleseren din (%s) er <b>utdatert</b>. Den har kjente <b>sikkerhetshull</b> og <b>kan ikke vise alle funksjonene</b> pÃ¥ denne og andre websider. <a%s>LÃ¦r hvordan du kan oppdatere din nettleser</a>';
else if (ll=="zh")
    t='æ‚¨çš„æµè§ˆå™¨(%s) éœ€è¦æ›´æ–°ã€‚è¯¥æµè§ˆå™¨æœ‰è¯¸å¤šå®‰å…¨æ¼æ´žï¼Œæ— æ³•æ˜¾ç¤ºæœ¬ç½‘ç«™çš„æ‰€æœ‰åŠŸèƒ½ã€‚ <a%s>äº†è§£å¦‚ä½•æ›´æ–°æµè§ˆå™¨</a>';
else if (ll=="fi")
    t='Selaimesi (%s) on <b>vanhentunut</b>. SiinÃ¤ on tunnettuja tietoturvaongelmia eikÃ¤ se vÃ¤lttÃ¤mÃ¤ttÃ¤ tue kaikkia ominaisuuksia tÃ¤llÃ¤ tai muilla sivustoilla. <a%s>Lue lisÃ¤Ã¤ siitÃ¤ kuinka pÃ¤ivitÃ¤t selaimesi</a>.';
else if (ll=="tr")
    t='TarayÄ±cÄ±nÄ±z (%s) <b>gÃ¼ncel deÄŸil</b>. Eski versiyon olduÄŸu iÃ§in <b>gÃ¼venlik aÃ§Ä±klarÄ±</b> vardÄ±r ve gÃ¶rmek istediÄŸiniz bu web sitesinin ve diÄŸer web sitelerinin <b>tÃ¼m Ã¶zelliklerini hatasÄ±z bir ÅŸekilde</b> gÃ¶steremeyecektir. <a%s>TarayÄ±cÄ±nÄ±zÄ± nasÄ±l gÃ¼ncelleyebileceÄŸinizi Ã¶ÄŸrenin</a>';
else if (ll=="ro")
    t='Browser-ul (%s) tau este <b>invechit</b>. Detine <b>probleme de securitate</b> cunoscute si poate <b>sa nu afiseze corect</b> toate elementele acestui si altor site-uri. <a%s>Invata cum sa-ti actualizezi browserul.</a>';
if (op.text)
    t = op.text;
if (op["text_"+ll])
    t = op["text_"+ll];

this.op.text=busprintf(t,this.op.browser.t,' href="'+this.op.url+'"'+tar);

var div = document.createElement("div");
this.op.div = div;
div.id="buorg";
div.className="buorg";
div.innerHTML= '<div>' + this.op.text + '<div id="buorgclose">&times;</div></div>';

var sheet = document.createElement("style");
//sheet.setAttribute("type", "text/css");
var style = "";
document.body.insertBefore(div,document.body.firstChild);
document.getElementsByTagName("head")[0].appendChild(sheet);
try {
    sheet.innerText=style;
    sheet.innerHTML=style;
}
catch(e) {
    try {
        sheet.styleSheet.cssText=style;
    }
    catch(e) {
        return;
    }
}
var me=this;


/*div.onclick=function(){
    if (me.op.newwindow)
        window.open(me.op.url,"_blank");
    else
        window.location.href=me.op.url;
    me.op.onclick(me.op);
    return false;
};*/
try {
div.getElementsByTagName("a")[0].onclick = function(e) {
    var e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    //me.op.onclick(me.op);
    return true;
};
}
catch(e) {}

var hm=document.getElementsByTagName("html")[0]||document.body;
this.op.bodymt = hm.style.marginTop;
hm.style.marginTop = (div.clientHeight)+"px";
document.getElementById("buorgclose").onclick = function(e) {
    var e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    me.op.div.style.display="none";
    hm.style.marginTop = me.op.bodymt;
    return true;
};
op.onshow(this.op);

};

var $buoop = $buoop||{};
$bu=$buo($buoop);