var xmlSchemaString =`
<xs:schema xmlns="http://www.w3.org/2000/svg" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xml="http://www.w3.org/XML/1998/namespace"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    targetNamespace="http://www.w3.org/2000/svg">
    <xs:import namespace="http://www.w3.org/1999/xlink" schemaLocation="xlink.xsd"/>
    <xs:import namespace="http://www.w3.org/XML/1998/namespace" schemaLocation="namespace.xsd"/>

    <!-- simpleTypes -->
    <xs:simpleType name="FontStretchType">
        <xs:restriction base="xs:string">
            <xs:enumeration value="normal"/>
            <xs:enumeration value="wider"/>
            <xs:enumeration value="narrower"/>
            <xs:enumeration value="ultra-condensed"/>
            <xs:enumeration value="extra-condensed"/>
            <xs:enumeration value="semi-condensed"/>
            <xs:enumeration value="semi-expanded"/>
            <xs:enumeration value="expanded"/>
            <xs:enumeration value="extra-expanded"/>
            <xs:enumeration value="ultra-expanded"/>
            <xs:enumeration value="inherit"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="angle">
        <xs:restriction base="xs:string">
            <xs:pattern value="[-+]?\d{1,4}(deg|grad|rad)?"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="BaselineShiftValueType">
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="baseline"/>
                    <xs:enumeration value="sub"/>
                    <xs:enumeration value="super"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="LengthType"/>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <!-- SVG BooleanType not needed, already defined by XML Schema -->
    <xs:simpleType name="ClassListType">
        <xs:annotation>
            <xs:documentation>Space-separated list of classes</xs:documentation>
        </xs:annotation>
        <xs:list itemType="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="ClipValueType">
        <xs:annotation>
            <xs:documentation>&lt;shape&gt; | auto | inherit</xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:string"/>
                <!-- shape -->
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="ClipPathValueType">
        <xs:annotation>
            <xs:documentation>&lt;uri&gt; | none | inherit</xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="inherit"/>
                    <xs:enumeration value="none"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:anyURI"/>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="ClipFillRuleType">
        <xs:annotation>
            <xs:documentation>'clip-rule' or fill-rule property/attribute value</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:enumeration value="evenodd"/>
            <xs:enumeration value="nonzero"/>
            <xs:enumeration value="inherit"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="ContentTypeType">
        <xs:annotation>
            <xs:documentation source="http://www.ietf.org/rfc/rfc2045.txt">media type, as per [RFC2045]
            </xs:documentation>
            <xs:documentation>media type, as per [RFC2045]</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="(text|image|audio|video|application|multipart|message)[-.+/\w]*"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="CoordinateType">
        <xs:annotation>
            <xs:documentation source="http://www.w3.org/TR/SVG/types.html#DataTypeCoordinate">a &lt;co-ordinate&gt;
            </xs:documentation>
            <xs:documentation>a coordinate, which is a number optionally followed immediately by a unit identifier.
                Perhaps it is possible to represent this as a xs:union by declaring unit idenifiers as a type?
            </xs:documentation>
        </xs:annotation>
        <xs:restriction base="LengthType"/>
    </xs:simpleType>
    <xs:simpleType name="CoordinatesType">
        <xs:annotation>
            <xs:documentation>a space separated list of CoordinateType. Punt to 'string' for now</xs:documentation>
        </xs:annotation>
        <xs:restriction>
            <xs:simpleType>
                <xs:list itemType="CoordinateType"/>
            </xs:simpleType>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="ColorType">
        <xs:annotation>
            <xs:documentation source="http://www.w3.org/TR/SVG/types.html#DataTypeColor">a CSS2 Color</xs:documentation>
            <xs:documentation>Color as defined in CSS2 and XSL 1.0 plus additional recognised color keyword names (the
                'X11 colors')
            </xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="inherit"/>
                    <xs:enumeration value="white"/>
                    <xs:enumeration value="silver"/>
                    <xs:enumeration value="gray"/>
                    <xs:enumeration value="black"/>
                    <xs:enumeration value="navy"/>
                    <xs:enumeration value="blue"/>
                    <xs:enumeration value="aqua"/>
                    <xs:enumeration value="teal"/>
                    <xs:enumeration value="green"/>
                    <xs:enumeration value="olive"/>
                    <!--       ...      -->
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:pattern value="[A-Za-z]{6}"/>
                    <!-- <xs:pattern value="[A-Za-z]+|#[0-9A-Fa-f]{3}|#[0-9A-Fa-f]{6}"/> -->
                </xs:restriction>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="CursorValueType">
        <xs:annotation>
            <xs:documentation>Value is an optional comma-separated of uri references followed by one token from an
                enumerated list.
            </xs:documentation>
            <xs:documentation>[ [&lt;uri&gt; ,]* [ auto | crosshair | default | pointer | move | e-resize | ne-resize |
                nw-resize | n-resize | se-resize | sw-resize | s-resize | w-resize| text | wait | help ] ] | inherit
            </xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="crosshair"/>
                    <xs:enumeration value="default"/>
                    <xs:enumeration value="pointer"/>
                    <xs:enumeration value="move"/>
                    <xs:enumeration value="e-resize"/>
                    <xs:enumeration value="ne-resize"/>
                    <xs:enumeration value="nw-resize"/>
                    <xs:enumeration value="n-resize"/>
                    <xs:enumeration value="se-resize"/>
                    <xs:enumeration value="sw-resize"/>
                    <xs:enumeration value="s-resize"/>
                    <xs:enumeration value="w-resize"/>
                    <xs:enumeration value="text"/>
                    <xs:enumeration value="wait"/>
                    <xs:enumeration value="help"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:anyURI"/>
                <!-- shape -->
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="EnableBackgroundValueType">
        <xs:annotation>
            <xs:documentation>accumulate | new [ &lt;x&gt; &lt;y&gt; &lt;width&gt; &lt;height&gt; ] | inherit
            </xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="accumulate"/>
                    <xs:enumeration value="x"/>
                    <xs:enumeration value="y"/>
                    <xs:enumeration value="width"/>
                    <xs:enumeration value="height"/>
                    <xs:enumeration value="inherit"/>
                    <xs:enumeration value="new"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:anyURI"/>
                <!-- shape -->
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="ExtensionListType">
        <xs:annotation>
            <xs:documentation>extension list specification</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
        <!--  Don't see this one in the SVG1.1 spec   -->
    </xs:simpleType>
    <xs:simpleType name="FeatureListType">
        <xs:annotation>
            <xs:documentation>feature list specification</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="FilterValueType">
        <xs:annotation>
            <xs:documentation>&lt;uri&gt; | none | inherit
            </xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:anyURI"/>
                <!-- shape -->
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="FontFamilyValueType">
        <xs:annotation>
            <xs:documentation>[[ &lt;family-name&gt; | &lt;generic-family&gt; ],]* [&lt;family-name&gt; | &lt;generic-family&gt;]
                | inherit
            </xs:documentation>
            <xs:documentation>'font-family' property/attribute value (i.e., list of fonts)</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="FontSizeValueType">
        <xs:annotation>
            <xs:documentation>'font-size' property/attribute value</xs:documentation>
            <xs:documentation>&lt;absolute-size&gt; | &lt;relative-size&gt; | &lt;length&gt; | &lt;percentage&gt; |
                inherit
            </xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="LengthType"/>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="FontSizeAdjustValueType">
        <xs:annotation>
            <xs:documentation>'font-size-adjust' property/attribute value</xs:documentation>
            <xs:documentation>&lt;number&gt; | none | inherit</xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="xs:decimal"/>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="GlyphOrientationHorizontalValueType">
        <xs:annotation>
            <xs:documentation>'glyph-orientation-horizontal' property/attribute value (e.g., &lt;angle&gt;)
            </xs:documentation>
            <xs:documentation>&lt;angle&gt; | inherit</xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="angle"/>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="GlyphOrientationVerticalValueType">
        <xs:annotation>
            <xs:documentation>'glyph-orientation-vertical' property/attribute value (e.g., 'auto', &lt;angle&gt;)
            </xs:documentation>
            <xs:documentation>auto | &lt;angle&gt; | inherit</xs:documentation>
        </xs:annotation>
        <xs:union>
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="inherit"/>
                    <xs:enumeration value="auto"/>
                </xs:restriction>
            </xs:simpleType>
            <xs:simpleType>
                <xs:restriction base="angle"/>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <!-- no need to declare IntegerType as XML Schema defines integers -->
    <xs:simpleType name="KerningValue">
        <xs:annotation>
            <xs:documentation>'kerning' property/attribute value (e.g., auto | &lt;length&gt;)</xs:documentation>
            <xs:documentation>auto | &lt;length&gt; | inherit</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="LanguageCodeType">
        <xs:annotation>
            <xs:documentation>a language code, as per [RFC3066]</xs:documentation>
            <xs:documentation source="http://www.ietf.org/rfc/rfc3066.txt"/>
            <xs:documentation>en-us, zh-CN, es-ES, etc.</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:language"/>
    </xs:simpleType>
    <xs:simpleType name="LanguageCodesType">
        <xs:annotation>
            <xs:documentation>a comma-separated list of language codes, as per [RFC3066]</xs:documentation>
            <xs:documentation source="http://www.ietf.org/rfc/rfc3066.txt"/>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="[^,]+(,\s*[^,]+)*"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="LengthType">
        <xs:annotation>
            <xs:documentation>a &lt;length&gt;</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern
                    value="((([-+]?(\d+))|([-+]?(((((\d+)?\.(\d+))|((\d+)\.))([eE][-+]?(\d+))?)|((\d+)([eE][-+]?(\d+))))))(em|ex|px|pt|pc|cm|mm|in|%)?)"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="LengthsType">
        <xs:annotation>
            <xs:documentation>a list of &lt;length&gt;s</xs:documentation>
        </xs:annotation>
        <xs:list itemType="LengthType"/>
    </xs:simpleType>
    <xs:simpleType name="LinkTargetType">
        <xs:annotation>
            <xs:documentation>link to this target</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="MarkerValueType">
        <xs:annotation>
            <xs:documentation>'marker' property/attribute value (e.g., 'none', %URI;)</xs:documentation>
        </xs:annotation>
        <xs:union memberTypes="xs:anyURI">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:union>
        <!-- need to check this one, its a shorthand value -->
    </xs:simpleType>
    <xs:simpleType name="MaskValueType">
        <xs:annotation>
            <xs:documentation>'mask' property/attribute value (e.g., 'none', %URI;)</xs:documentation>
            <xs:documentation>&lt;uri&gt; | none | inherit</xs:documentation>
        </xs:annotation>
        <xs:union memberTypes="xs:anyURI">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:union>
    </xs:simpleType>
    <xs:simpleType name="MediaDescType">
        <xs:annotation>
            <xs:documentation>comma-separated list of media descriptors.</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="[^,]+(,\s*[^,]+)*"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="NumberOptionalNumberType">
        <xs:annotation>
            <xs:documentation>list of &lt;number&gt;s, but at least one and at most two</xs:documentation>
        </xs:annotation>
        <xs:restriction>
            <xs:simpleType>
                <xs:list itemType="xs:decimal"/>
            </xs:simpleType>
            <xs:minLength value="1"/>
            <xs:maxLength value="2"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="NumberOrPercentageType">
        <xs:annotation>
            <xs:documentation>a &lt;number&gt; or a &lt;percentage&gt;</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:decimal"/>
    </xs:simpleType>
    <xs:simpleType name="NumbersType">
        <xs:annotation>
            <xs:documentation>list of &lt;number&gt;s</xs:documentation>
        </xs:annotation>
        <xs:list itemType="xs:decimal"/>
    </xs:simpleType>
    <xs:simpleType name="OpacityValueType">
        <xs:annotation>
            <xs:documentation>opacity value (e.g., &lt;number&gt;)</xs:documentation>
            <xs:documentation>&lt;alphavalue&gt; | inherit</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="PaintType">
        <xs:annotation>
            <xs:documentation>a 'fill' or 'stroke' property/attribute value</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="PathDataType">
        <xs:annotation>
            <xs:documentation>a path data specification</xs:documentation>
            <xs:documentation source="http://www.w3.org/TR/SVG/paths.html"/>
            <xs:documentation>absolute/relative
                M/m: moveto
                L/l: lineto
                H/h: horizontal lineto
                V/v: vertical lineto
                C/c: curveto
                S/s: smooth curveto
                Q/q: quadratic Bézier curveto
                T/t: smooth quadratic Bézier curveto
                A/a: arc path
                Z/z: close path
            </xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="([MLHVCSQTAZmlhvcsqtaz]\s*(-?\d*(\.\d+)?\s*,?\s*)*)*"/>
            <!-- commas allowed too -->
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="PointsType">
        <xs:annotation>
            <xs:documentation>a list of points</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="([-+]?\d{1,4},[-+]?\d{1,4}\s*)*"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="PreserveAspectRatioSpecType">
        <xs:annotation>
            <xs:documentation>'preserveAspectRatio' attribute specification</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="\s*none|x(Min|Mid|Max)Y(Min|Mid|Max)(\s+(meet|slice))?\s*"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="ScriptType">
        <xs:annotation>
            <xs:documentation>script expression</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="SpacingValueType">
        <xs:annotation>
            <xs:documentation>'letter-spacing' or 'word-spacing' property/attribute value (e.g., normal | &lt;length&gt;)</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:enumeration value="auto"/>
            <xs:enumeration value="exact"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="StrokeDashArrayValueType">
        <xs:annotation>
            <xs:documentation>'stroke-dasharray' property/attribute value (e.g., 'none', list of &lt;number&gt;s)
            </xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="StrokeDashOffsetValueType">
        <xs:annotation>
            <xs:documentation>'stroke-dashoffset' property/attribute value (e.g., 'none', &gt;length&gt;)
            </xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="StrokeMiterLimitValueType">
        <xs:annotation>
            <xs:documentation>'stroke-miterlimit' property/attribute value (e.g., &lt;number&gt;)</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="StrokeWidthValueType">
        <xs:annotation>
            <xs:documentation>'stroke-width' property/attribute value (e.g., &lt;length&gt;)</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <!-- <xs:simpleType name="StructuredTextType" base="xs:string"/> expanded <xs:simpleType> -->
    <xs:simpleType name="StyleSheetType">
        <xs:annotation>
            <xs:documentation>style sheet data</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="SVGColorType">
        <xs:annotation>
            <xs:documentation>An SVG color value (sRGB plus optional ICC)</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <!-- <xs:simpleType name="TextType" base="xs:string"/> not necessary (string) -->
    <xs:simpleType name="TextDecorationValueType">
        <xs:annotation>
            <xs:documentation>'text-decoration' property/attribute value (e.g., 'none', 'underline')</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:enumeration value="none"/>
            <xs:enumeration value="underline"/>
            <xs:enumeration value="overline"/>
            <xs:enumeration value="line-through"/>
        </xs:restriction>
    </xs:simpleType>
    <xs:simpleType name="TransformListType">
        <xs:annotation>
            <!-- </xs:simpleType> -->
            <xs:documentation>Yes, of course this was generated by a program!</xs:documentation>
            <xs:documentation>list of transforms</xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string"/>
    </xs:simpleType>
    <xs:simpleType name="ViewBoxSpecType">
        <xs:annotation>
            <xs:documentation>'viewBox' attribute specification</xs:documentation>
            <xs:documentation>xs:sequence is min-x, min-y, width, height></xs:documentation>
        </xs:annotation>
        <xs:restriction base="xs:string">
            <xs:pattern value="a+"/>
            <xs:pattern value="\d{1,4}\s\d{1,4}\s\d{1,4}\s\d{1,4}\s*"/>
        </xs:restriction>
    </xs:simpleType>
    <!-- attribute xs:groups -->
    <xs:attributeGroup name="stdAttrs">
        <xs:annotation>
            <xs:documentation>All elements have an ID</xs:documentation>
        </xs:annotation>
        <xs:attribute name="id" type="xs:ID"/>
        <xs:attribute ref="xml:base"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="langSpaceAttrs">
        <xs:annotation>
            <xs:documentation>Common attributes for elements that might contain character data content
            </xs:documentation>
        </xs:annotation>
        <xs:attribute ref="xml:lang"/>
        <xs:attribute ref="xml:space"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="testAttrs">
        <xs:annotation>
            <xs:documentation>Common attributes to check for system capabilities</xs:documentation>
        </xs:annotation>
        <xs:attribute name="requiredFeatures" type="FeatureListType"/>
        <xs:attribute name="requiredExtensions" type="ExtensionListType"/>
        <xs:attribute name="systemLanguage" type="LanguageCodeType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="xlinkRefAttrs">
        <xs:annotation>
            <xs:documentation>For most uses of URI referencing: standard XLink attributes other than xlink:href
            </xs:documentation>
        </xs:annotation>
        <xs:attribute ref="xlink:type" fixed="simple"/>
        <xs:attribute ref="xlink:role"/>
        <xs:attribute ref="xlink:arcrole"/>
        <xs:attribute ref="xlink:title"/>
        <xs:attribute ref="xlink:show" default="other"/>
        <xs:attribute ref="xlink:actuate"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="xlinkRefAttrsEmbed">
        <xs:annotation>
            <xs:documentation>Standard XLink attributes for uses of URI referencing where xlink:show is 'embed'
            </xs:documentation>
        </xs:annotation>
        <xs:attribute ref="xlink:type" fixed="simple"/>
        <xs:attribute ref="xlink:role"/>
        <xs:attribute ref="xlink:arcrole"/>
        <xs:attribute ref="xlink:title"/>
        <xs:attribute ref="xlink:show"/>
        <xs:attribute ref="xlink:actuate"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="graphicsElementEvents">
        <xs:attribute name="onfocusin" type="ScriptType"/>
        <xs:attribute name="onfocusout" type="ScriptType"/>
        <xs:attribute name="onactivate" type="ScriptType"/>
        <xs:attribute name="onclick" type="ScriptType"/>
        <xs:attribute name="onmousedown" type="ScriptType"/>
        <xs:attribute name="onmouseup" type="ScriptType"/>
        <xs:attribute name="onmouseover" type="ScriptType"/>
        <xs:attribute name="onmousemove" type="ScriptType"/>
        <xs:attribute name="onmouseout" type="ScriptType"/>
        <xs:attribute name="onload" type="ScriptType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="documentEvents">
        <xs:attribute name="onunload" type="ScriptType"/>
        <xs:attribute name="onabort" type="ScriptType"/>
        <xs:attribute name="onerror" type="ScriptType"/>
        <xs:attribute name="onresize" type="ScriptType"/>
        <xs:attribute name="onscroll" type="ScriptType"/>
        <xs:attribute name="onzoom" type="ScriptType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="animationEvents">
        <xs:attribute name="onbegin" type="ScriptType"/>
        <xs:attribute name="onend" type="ScriptType"/>
        <xs:attribute name="onrepeat" type="ScriptType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Color">
        <xs:annotation>
            <xs:documentation>The following presentation attributes have to do with specifying color.</xs:documentation>
        </xs:annotation>
        <xs:attribute name="color" type="ColorType"/>
        <xs:attribute name="color-interpolation">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="sRGB"/>
                    <xs:enumeration value="linearRGB"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="color-rendering">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="optimizeSpeed"/>
                    <xs:enumeration value="optimizeQuality"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Containers">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to container elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="enable-background" type="EnableBackgroundValueType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-feFlood">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to 'feFlood' elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="flood-color" type="SVGColorType"/>
        <xs:attribute name="flood-opacity" type="OpacityValueType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-FilterPrimitives">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to filter primitives</xs:documentation>
        </xs:annotation>
        <xs:attribute name="color-interpolation-filters">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="sRGB"/>
                    <xs:enumeration value="linearRGB"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-FillStroke">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to filling and stroking operations
            </xs:documentation>
        </xs:annotation>
        <xs:attribute name="fill" type="PaintType"/>
        <xs:attribute name="fill-opacity" type="OpacityValueType"/>
        <xs:attribute name="fill-rule" type="ClipFillRuleType"/>
        <xs:attribute name="stroke" type="PaintType"/>
        <xs:attribute name="stroke-dasharray" type="StrokeDashArrayValueType"/>
        <xs:attribute name="stroke-dashoffset" type="StrokeDashOffsetValueType"/>
        <xs:attribute name="stroke-linecap">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="butt"/>
                    <xs:enumeration value="round"/>
                    <xs:enumeration value="square"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="stroke-linejoin">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="miter"/>
                    <xs:enumeration value="round"/>
                    <xs:enumeration value="bevel"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="stroke-miterlimit" type="StrokeMiterLimitValueType"/>
        <xs:attribute name="stroke-opacity" type="OpacityValueType"/>
        <xs:attribute name="stroke-width" type="StrokeWidthValueType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-FontSpecification">
        <xs:annotation>
            <xs:documentation>The following presentation attributes have to do with selecting a font to use
            </xs:documentation>
        </xs:annotation>
        <xs:attribute name="font-family" type="FontFamilyValueType"/>
        <xs:attribute name="font-size" type="FontSizeValueType"/>
        <xs:attribute name="font-size-adjust" type="FontSizeAdjustValueType"/>
        <xs:attribute name="font-stretch" type="FontStretchType"/>
        <xs:attribute name="font-style">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="normal"/>
                    <xs:enumeration value="italic"/>
                    <xs:enumeration value="oblique"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="font-variant">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="normal"/>
                    <xs:enumeration value="small-caps"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="font-weight">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="normal"/>
                    <xs:enumeration value="bold"/>
                    <xs:enumeration value="bolder"/>
                    <xs:enumeration value="lighter"/>
                    <xs:enumeration value="100"/>
                    <xs:enumeration value="200"/>
                    <xs:enumeration value="300"/>
                    <xs:enumeration value="400"/>
                    <xs:enumeration value="500"/>
                    <xs:enumeration value="600"/>
                    <xs:enumeration value="700"/>
                    <xs:enumeration value="800"/>
                    <xs:enumeration value="900"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Gradients">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to gradient 'stop' elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="stop-color" type="SVGColorType"/>
        <xs:attribute name="stop-opacity" type="OpacityValueType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Graphics">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to graphics elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="clip-path" type="ClipPathValueType"/>
        <xs:attribute name="clip-rule" type="ClipFillRuleType"/>
        <xs:attribute name="cursor" type="CursorValueType"/>
        <xs:attribute name="display">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="inline"/>
                    <xs:enumeration value="block"/>
                    <xs:enumeration value="list-item"/>
                    <xs:enumeration value="run-in"/>
                    <xs:enumeration value="compact"/>
                    <xs:enumeration value="marker"/>
                    <xs:enumeration value="table"/>
                    <xs:enumeration value="inline-table"/>
                    <xs:enumeration value="table-row-xs:group"/>
                    <xs:enumeration value="table-header-xs:group"/>
                    <xs:enumeration value="table-footer-xs:group"/>
                    <xs:enumeration value="table-row"/>
                    <xs:enumeration value="table-column-xs:group"/>
                    <xs:enumeration value="table-column"/>
                    <xs:enumeration value="table-cell"/>
                    <xs:enumeration value="table-caption"/>
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="filter" type="FilterValueType"/>
        <xs:attribute name="image-rendering">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="optimizeSpeed"/>
                    <xs:enumeration value="optimizeQuality"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="mask" type="MaskValueType"/>
        <xs:attribute name="opacity" type="OpacityValueType"/>
        <xs:attribute name="pointer-events">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="visiblePainted"/>
                    <xs:enumeration value="visibleFill"/>
                    <xs:enumeration value="visibleStroke"/>
                    <xs:enumeration value="visibleFillStroke"/>
                    <xs:enumeration value="visible"/>
                    <xs:enumeration value="painted"/>
                    <xs:enumeration value="fill"/>
                    <xs:enumeration value="stroke"/>
                    <xs:enumeration value="fillstroke"/>
                    <xs:enumeration value="all"/>
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="shape-rendering">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="optimizeSpeed"/>
                    <xs:enumeration value="crispEdges"/>
                    <xs:enumeration value="geometricPrecision"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="text-rendering">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="optimizeSpeed"/>
                    <xs:enumeration value="optimizeLegibility"/>
                    <xs:enumeration value="geometricPrecision"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="visibility">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="visible"/>
                    <xs:enumeration value="hidden"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Images">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to 'image' elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="color-profile"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-LightingEffects">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to 'feDiffuseLighting' and
                'feSpecularLighting' elements
            </xs:documentation>
        </xs:annotation>
        <xs:attribute name="lighting-color" type="SVGColorType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Markers">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to marker operations</xs:documentation>
        </xs:annotation>
        <xs:attribute name="marker-start" type="MarkerValueType"/>
        <xs:attribute name="marker-mid" type="MarkerValueType"/>
        <xs:attribute name="marker-end" type="MarkerValueType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-TextContentElements">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to text content elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="alignment-baseline">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="baseline"/>
                    <xs:enumeration value="top"/>
                    <xs:enumeration value="before-edge"/>
                    <xs:enumeration value="text-top"/>
                    <xs:enumeration value="text-before-edge"/>
                    <xs:enumeration value="middle"/>
                    <xs:enumeration value="bottom"/>
                    <xs:enumeration value="after-edge"/>
                    <xs:enumeration value="text-bottom"/>
                    <xs:enumeration value="text-after-edge"/>
                    <xs:enumeration value="ideographic"/>
                    <xs:enumeration value="lower"/>
                    <xs:enumeration value="hanging"/>
                    <xs:enumeration value="mathematical"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="baseline-shift" type="BaselineShiftValueType"/>
        <xs:attribute name="direction">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="ltr"/>
                    <xs:enumeration value="rtl"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="dominant-baseline">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="autosense-script"/>
                    <xs:enumeration value="no-change"/>
                    <xs:enumeration value="reset"/>
                    <xs:enumeration value="ideographic"/>
                    <xs:enumeration value="lower"/>
                    <xs:enumeration value="hanging"/>
                    <xs:enumeration value="mathematical"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="glyph-orientation-horizontal" type="GlyphOrientationHorizontalValueType"/>
        <xs:attribute name="glyph-orientation-vertical" type="GlyphOrientationVerticalValueType"/>
        <xs:attribute name="letter-spacing" type="SpacingValueType"/>
        <xs:attribute name="text-anchor">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="start"/>
                    <xs:enumeration value="middle"/>
                    <xs:enumeration value="end"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="text-decoration" type="TextDecorationValueType"/>
        <xs:attribute name="unicode-bidi">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="normal"/>
                    <xs:enumeration value="embed"/>
                    <xs:enumeration value="bidi-override"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="word-spacing" type="SpacingValueType"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-TextElements">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to 'text' elements</xs:documentation>
        </xs:annotation>
        <xs:attribute name="writing-mode">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="lr-tb"/>
                    <xs:enumeration value="rl-tb"/>
                    <xs:enumeration value="tb-rl"/>
                    <xs:enumeration value="lr"/>
                    <xs:enumeration value="rl"/>
                    <xs:enumeration value="tb"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-Viewports">
        <xs:annotation>
            <xs:documentation>The following presentation attributes apply to elements that establish viewports
            </xs:documentation>
        </xs:annotation>
        <xs:attribute name="clip" type="ClipValueType"/>
        <xs:attribute name="overflow">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="visible"/>
                    <xs:enumeration value="hidden"/>
                    <xs:enumeration value="scroll"/>
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="inherit"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="PresentationAttributes-All">
        <xs:annotation>
            <xs:documentation>The following represents the complete list of presentation attributes</xs:documentation>
        </xs:annotation>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-Containers"/>
        <xs:attributeGroup ref="PresentationAttributes-feFlood"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FilterPrimitives"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Gradients"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-Images"/>
        <xs:attributeGroup ref="PresentationAttributes-LightingEffects"/>
        <xs:attributeGroup ref="PresentationAttributes-Markers"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="PresentationAttributes-TextElements"/>
        <xs:attributeGroup ref="PresentationAttributes-Viewports"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="filter_primitive_attributes">
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType"/>
        <xs:attribute name="height" type="LengthType"/>
        <xs:attribute name="result" type="xs:string"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="filter_primitive_attributes_with_in">
        <xs:attributeGroup ref="filter_primitive_attributes"/>
        <xs:attribute name="in" type="xs:string"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="component_transfer_function_attributes">
        <xs:attribute name="type" use="required">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="identity"/>
                    <xs:enumeration value="table"/>
                    <xs:enumeration value="discrete"/>
                    <xs:enumeration value="linear"/>
                    <xs:enumeration value="gamma"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="tableValues" type="xs:string"/>
        <xs:attribute name="slope" type="xs:double"/>
        <xs:attribute name="intercept" type="xs:double"/>
        <xs:attribute name="amplitude" type="xs:double"/>
        <xs:attribute name="exponent" type="xs:double"/>
        <xs:attribute name="offset" type="xs:double"/>
        <!-- here -->
    </xs:attributeGroup>
    <xs:attributeGroup name="animElementAttrs">
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="animattributeAttrs">
        <xs:attribute name="attributeName" type="xs:string" use="required"/>
        <xs:attribute name="attributeType" type="xs:string"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="animTargetAttrs">
        <xs:attributeGroup ref="animElementAttrs"/>
        <xs:attributeGroup ref="animattributeAttrs"/>
    </xs:attributeGroup>
    <xs:attributeGroup name="animTimingAttrs">
        <xs:attribute name="begin" type="xs:string"/>
        <xs:attribute name="dur" type="xs:string"/>
        <xs:attribute name="end" type="xs:string"/>
        <xs:attribute name="min" type="xs:string"/>
        <xs:attribute name="max" type="xs:string"/>
        <xs:attribute name="restart" default="always">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="always"/>
                    <xs:enumeration value="never"/>
                    <xs:enumeration value="whenNotActive"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="repeatCount" type="xs:string"/>
        <xs:attribute name="repeatDur" type="xs:string"/>
        <xs:attribute name="fill" default="remove">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="remove"/>
                    <xs:enumeration value=" dtd"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <xs:attributeGroup name="animValueAttrs">
        <xs:attribute name="calcMode" default="linear">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="discrete"/>
                    <xs:enumeration value="linear"/>
                    <xs:enumeration value="paced"/>
                    <xs:enumeration value="spline"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="values" type="xs:string"/>
        <xs:attribute name="keyTimes" type="xs:string"/>
        <xs:attribute name="keySplines" type="xs:string"/>
        <xs:attribute name="from" type="xs:string"/>
        <xs:attribute name="to" type="xs:string"/>
        <xs:attribute name="by" type="xs:string"/>
        <!-- could add a xs:pattern facet here -->
    </xs:attributeGroup>
    <xs:attributeGroup name="animAdditionAttrs">
        <xs:attribute name="additive" default="replace">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="replace"/>
                    <xs:enumeration value="sum"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="accumulate" default="none">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="none"/>
                    <xs:enumeration value="sum"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:attributeGroup>
    <!-- xs:groups -->
    <xs:group name="descTitleMetadata">
        <xs:annotation>
            <xs:documentation>This is too permissive (you shouldn't be allowed to have more than one of each of the
                following) but it is hard or impossible to specify this in XSD as part of a larger xs:sequence.
            </xs:documentation>
        </xs:annotation>
        <xs:choice>
            <xs:element name="desc" type="descType"/>
            <xs:element name="title" type="titleType"/>
            <xs:element name="metadata" type="metadataType"/>
        </xs:choice>
    </xs:group>
    <!-- elements -->
    <xs:element name="tigerTest" type="xs:string"/>
    <xs:element name="svg" type="svgType"/>
    <xs:element name="g" type="gType"/>
    <xs:element name="defs" type="defsType"/>
    <xs:element name="desc" type="descType"/>
    <xs:element name="title" type="titleType"/>
    <xs:element name="symbol" type="symbolType"/>
    <xs:element name="use" type="useType"/>
    <xs:element name="image" type="imageType"/>
    <xs:element name="switch" type="switchType"/>
    <xs:element name="style" type="styleType"/>
    <xs:element name="path" type="pathType"/>
    <xs:element name="rect" type="rectType"/>
    <xs:element name="circle" type="circleType"/>
    <xs:element name="ellipse" type="ellipseType"/>
    <xs:element name="line" type="lineType"/>
    <xs:element name="polyline" type="polylineType"/>
    <xs:element name="polygon" type="polygonType"/>
    <xs:element name="text" type="textType"/>
    <xs:element name="tspan" type="tspanType"/>
    <xs:element name="tref" type="trefType"/>
    <xs:element name="textPath" type="textPathType"/>
    <xs:element name="altGlyph" type="altGlyphType"/>
    <xs:element name="altGlyphDef" type="altGlyphDefType"/>
    <xs:element name="altGlyphItem" type="altGlyphItemType"/>
    <xs:element name="glyphRef" type="glyphRefType"/>
    <xs:element name="marker" type="markerType"/>
    <xs:element name="color-profile" type="color-profileType"/>
    <xs:element name="linearGradient" type="linearGradientType"/>
    <xs:element name="radialGradient" type="radialGradientType"/>
    <xs:element name="stop" type="stopType"/>
    <xs:element name="pattern" type="patternType"/>
    <xs:element name="clipPath" type="clipPathType"/>
    <xs:element name="mask" type="maskType"/>
    <xs:element name="filter" type="filterType"/>
    <xs:element name="feDistantLight" type="feDistantLightType"/>
    <xs:element name="fePointLight" type="fePointLightType"/>
    <xs:element name="feSpotLight" type="feSpotLightType"/>
    <xs:element name="feBlend" type="feBlendType"/>
    <xs:element name="feColorMatrix" type="feColorMatrixType"/>
    <xs:element name="feComponentTransfer" type="feComponentTransferType"/>
    <xs:element name="feFuncR" type="feFuncRType"/>
    <xs:element name="feFuncG" type="feFuncGType"/>
    <xs:element name="feFuncB" type="feFuncBType"/>
    <xs:element name="feFuncA" type="feFuncAType"/>
    <xs:element name="feComposite" type="feCompositeType"/>
    <xs:element name="feConvolveMatrix" type="feConvolveMatrixType"/>
    <xs:element name="feDiffuseLighting" type="feDiffuseLightingType"/>
    <xs:element name="feDisplacementMap" type="feDisplacementMapType"/>
    <xs:element name="feFlood" type="feFloodType"/>
    <xs:element name="feGaussianBlur" type="feGaussianBlurType"/>
    <xs:element name="feImage" type="feImageType"/>
    <xs:element name="feMerge" type="feMergeType"/>
    <xs:element name="feMergeNode" type="feMergeNodeType"/>
    <xs:element name="feMorphology" type="feMorphologyType"/>
    <xs:element name="feOffset" type="feOffsetType"/>
    <xs:element name="feSpecularLighting" type="feSpecularLightingType"/>
    <xs:element name="feTile" type="feTileType"/>
    <xs:element name="feTurbulence" type="feTurbulenceType"/>
    <xs:element name="cursor" type="cursorType"/>
    <xs:element name="a" type="aType"/>
    <xs:element name="view" type="viewType"/>
    <xs:element name="script" type="scriptType"/>
    <xs:element name="animate" type="animateType"/>
    <xs:element name="set" type="setType"/>
    <xs:element name="animateMotion" type="animateMotionType"/>
    <xs:element name="mpath" type="mpathType"/>
    <xs:element name="animateColor" type="animateColorType"/>
    <xs:element name="animateTransform" type="animateTransformType"/>
    <xs:element name="font" type="fontType"/>
    <xs:element name="glyph" type="glyphType"/>
    <xs:element name="missing-glyph" type="missing-glyphType"/>
    <xs:element name="hkern" type="hkernType"/>
    <xs:element name="vkern" type="vkernType"/>
    <xs:element name="font-face" type="font-faceType"/>
    <xs:element name="font-face-src" type="font-face-srcType"/>
    <xs:element name="font-face-uri" type="font-face-uriType"/>
    <xs:element name="font-face-format" type="font-face-formatType"/>
    <xs:element name="font-face-name" type="font-face-nameType"/>
    <xs:element name="definition-src" type="definition-srcType"/>
    <xs:element name="metadata" type="metadataType"/>
    <xs:element name="foreignObject" type="foreignObjectType"/>
    <!--  complex types -->
    <xs:complexType name="svgType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
            <!-- should this be done with named child element collections? Especially for modularisation. -->
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="viewBox" type="ViewBoxSpecType"/>
        <xs:attribute name="preserveAspectRatio" type="PreserveAspectRatioSpecType" default="xMidYMid meet"/>
        <xs:attribute name="zoomAndPan" default="magnify">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="disable"/>
                    <xs:enumeration value="magnify"/>
                    <xs:enumeration value="zoom"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attributeGroup ref="documentEvents"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType"/>
        <xs:attribute name="height" type="LengthType"/>
        <xs:attribute name="contentScriptType" type="ContentTypeType" default="text/ecmascript"/>
        <xs:attribute name="contentStyleType" type="ContentTypeType" default="text/css"/>
        <xs:attribute name="version" type="xs:token"/>
    </xs:complexType>
    <xs:complexType name="gType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
    </xs:complexType>
    <xs:complexType name="defsType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
    </xs:complexType>
    <xs:complexType name="descType" mixed="true">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attribute name="content" type="xs:string" fixed="structured text"/>
    </xs:complexType>
    <xs:complexType name="titleType" mixed="true">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attribute name="content" type="xs:string" fixed="structured text"/>
    </xs:complexType>
    <xs:complexType name="symbolType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="viewBox" type="ViewBoxSpecType"/>
        <xs:attribute name="preserveAspectRatio" type="PreserveAspectRatioSpecType" default="xMidYMid meet"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
    </xs:complexType>
    <xs:complexType name="useType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrsEmbed"/>
        <xs:attribute ref="xlink:href" use="required"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType"/>
        <xs:attribute name="height" type="LengthType"/>
    </xs:complexType>
    <xs:complexType name="imageType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
                <!-- this should probably be a named element xs:group -->
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-Viewports"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType" use="required"/>
        <xs:attribute name="height" type="LengthType" use="required"/>
    </xs:complexType>
    <xs:complexType name="switchType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="path"/>
                <xs:element ref="text"/>
                <xs:element ref="rect"/>
                <xs:element ref="circle"/>
                <xs:element ref="ellipse"/>
                <xs:element ref="line"/>
                <xs:element ref="polyline"/>
                <xs:element ref="polygon"/>
                <xs:element ref="use"/>
                <xs:element ref="image"/>
                <xs:element ref="svg"/>
                <xs:element ref="g"/>
                <xs:element ref="switch"/>
                <xs:element ref="a"/>
                <xs:element ref="foreignObject"/>
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
    </xs:complexType>
    <xs:complexType name="styleType" mixed="true">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute ref="xml:space" fixed="preserve"/>
        <xs:attribute name="type" type="ContentTypeType" use="required"/>
        <xs:attribute name="media" type="MediaDescType"/>
        <xs:attribute name="title" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="pathType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-Markers"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="d" type="PathDataType" use="required"/>
        <xs:attribute name="pathLength" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="rectType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType" use="required"/>
        <xs:attribute name="height" type="LengthType" use="required"/>
        <xs:attribute name="rx" type="LengthType"/>
        <xs:attribute name="ry" type="LengthType"/>
    </xs:complexType>
    <xs:complexType name="circleType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="cx" type="CoordinateType"/>
        <xs:attribute name="cy" type="CoordinateType"/>
        <xs:attribute name="r" type="LengthType" use="required"/>
    </xs:complexType>
    <xs:complexType name="ellipseType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="cx" type="CoordinateType"/>
        <xs:attribute name="cy" type="CoordinateType"/>
        <xs:attribute name="rx" type="LengthType" use="required"/>
        <xs:attribute name="ry" type="LengthType" use="required"/>
    </xs:complexType>
    <xs:complexType name="lineType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-Markers"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x1" type="CoordinateType"/>
        <xs:attribute name="y1" type="CoordinateType"/>
        <xs:attribute name="x2" type="CoordinateType"/>
        <xs:attribute name="y2" type="CoordinateType"/>
    </xs:complexType>
    <xs:complexType name="polylineType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-Markers"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="points" type="PointsType" use="required"/>
    </xs:complexType>
    <xs:complexType name="polygonType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-Markers"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="points" type="PointsType" use="required"/>
    </xs:complexType>
    <xs:complexType name="textType" mixed="true">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="tspan"/>
            <xs:element ref="tref"/>
            <xs:element ref="textPath"/>
            <xs:element ref="altGlyph"/>
            <xs:element ref="a"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="PresentationAttributes-TextElements"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="textLength" type="LengthType"/>
        <xs:attribute name="lengthAdjust">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="spacing"/>
                    <xs:enumeration value="spacingAndGlyphs"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="tspanType" mixed="true">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="tspan"/>
            <xs:element ref="tref"/>
            <xs:element ref="altGlyph"/>
            <xs:element ref="a"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateColor"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinatesType"/>
        <xs:attribute name="y" type="CoordinatesType"/>
        <xs:attribute name="dx" type="LengthsType"/>
        <xs:attribute name="dy" type="LengthsType"/>
        <xs:attribute name="rotate" type="xs:string"/>
        <xs:attribute name="textLength" type="LengthType"/>
        <xs:attribute name="lengthAdjust">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="spacing"/>
                    <xs:enumeration value="spacingAndGlyphs"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="trefType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateColor"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinatesType"/>
        <xs:attribute name="y" type="CoordinatesType"/>
        <xs:attribute name="dx" type="LengthsType"/>
        <xs:attribute name="dy" type="LengthsType"/>
        <xs:attribute name="rotate" type="xs:string"/>
        <xs:attribute name="textLength" type="LengthType"/>
        <xs:attribute name="lengthAdjust">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="spacing"/>
                    <xs:enumeration value="spacingAndGlyphs"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="textPathType" mixed="true">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="tspan"/>
            <xs:element ref="tref"/>
            <xs:element ref="altGlyph"/>
            <xs:element ref="a"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateColor"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="startOffset" type="xs:string"/>
        <xs:attribute name="textLength" type="LengthType"/>
        <xs:attribute name="lengthAdjust">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="spacing"/>
                    <xs:enumeration value="spacingAndGlyphs"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="method">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="align"/>
                    <xs:enumeration value="stretch"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="spacing">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="exact"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="altGlyphType" mixed="true">
        <xs:sequence minOccurs="0" maxOccurs="unbounded"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="glyphRef" type="xs:string"/>
        <xs:attribute name="format" type="xs:string"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Color"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinatesType"/>
        <xs:attribute name="y" type="CoordinatesType"/>
        <xs:attribute name="dx" type="LengthsType"/>
        <xs:attribute name="dy" type="LengthsType"/>
        <xs:attribute name="rotate" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="altGlyphDefType">
        <xs:choice maxOccurs="unbounded">
            <xs:element ref="altGlyphItem"/>
            <xs:element ref="glyphRef"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
    </xs:complexType>
    <xs:complexType name="altGlyphItemType">
        <xs:sequence maxOccurs="unbounded">
            <xs:element ref="glyphRef"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
    </xs:complexType>
    <xs:complexType name="glyphRefType">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attribute name="glyphRef" type="xs:string" use="required"/>
        <xs:attribute name="format" type="xs:string" use="required"/>
        <xs:attribute name="x" type="CoordinatesType"/>
        <xs:attribute name="y" type="CoordinatesType"/>
        <xs:attribute name="dx" type="LengthsType"/>
        <xs:attribute name="dy" type="LengthsType"/>
    </xs:complexType>
    <xs:complexType name="markerType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="viewBox" type="ViewBoxSpecType"/>
        <xs:attribute name="preserveAspectRatio" type="PreserveAspectRatioSpecType" default="xMidYMid meet"/>
        <xs:attribute name="refX" type="CoordinateType"/>
        <xs:attribute name="refY" type="CoordinateType"/>
        <xs:attribute name="markerUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="strokeWidth"/>
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="markerWidth" type="LengthType"/>
        <xs:attribute name="markerHeight" type="LengthType"/>
        <xs:attribute name="orient" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="color-profileType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="local" type="xs:string"/>
        <xs:attribute name="name" type="xs:string" use="required"/>
        <xs:attribute name="rendering-intent" default="auto">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="auto"/>
                    <xs:enumeration value="perceptual"/>
                    <xs:enumeration value="relative-colorimetric"/>
                    <xs:enumeration value="saturation"/>
                    <xs:enumeration value="absolute-colorimetric"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="linearGradientType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="stop"/>
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attribute name="gradientUnits">
            <!-- @@ need to add more attributes here @@ -->
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="gradientTransform" type="TransformListType"/>
        <xs:attribute name="x1" type="CoordinateType"/>
        <xs:attribute name="y1" type="CoordinateType"/>
        <xs:attribute name="x2" type="CoordinateType"/>
        <xs:attribute name="y2" type="CoordinateType"/>
        <xs:attribute name="spreadMethod" default="pad">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="pad"/>
                    <xs:enumeration value="reflect"/>
                    <xs:enumeration value="repeat"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="radialGradientType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="stop"/>
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="gradientUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="gradientTransform" type="TransformListType"/>
        <xs:attribute name="cx" type="CoordinateType"/>
        <xs:attribute name="cy" type="CoordinateType"/>
        <xs:attribute name="r" type="LengthType"/>
        <xs:attribute name="fx" type="CoordinateType"/>
        <xs:attribute name="fy" type="CoordinateType"/>
        <xs:attribute name="spreadMethod" default="pad">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="pad"/>
                    <xs:enumeration value="reflect"/>
                    <xs:enumeration value="repeat"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="stopType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateColor"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-Gradients"/>
        <xs:attribute name="offset" type="LengthType" use="required"/>
    </xs:complexType>
    <xs:complexType name="patternType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="viewBox" type="ViewBoxSpecType"/>
        <xs:attribute name="preserveAspectRatio" type="PreserveAspectRatioSpecType" default="xMidYMid meet"/>
        <xs:attribute name="patternUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="patternTransform" type="TransformListType"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType" use="required"/>
        <xs:attribute name="height" type="LengthType" use="required"/>
    </xs:complexType>
    <xs:complexType name="clipPathType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="path"/>
                <xs:element ref="text"/>
                <xs:element ref="rect"/>
                <xs:element ref="circle"/>
                <xs:element ref="ellipse"/>
                <xs:element ref="line"/>
                <xs:element ref="polyline"/>
                <xs:element ref="polygon"/>
                <xs:element ref="use"/>
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-FillStroke"/>
        <xs:attributeGroup ref="PresentationAttributes-FontSpecification"/>
        <xs:attributeGroup ref="PresentationAttributes-Graphics"/>
        <xs:attributeGroup ref="PresentationAttributes-TextContentElements"/>
        <xs:attributeGroup ref="PresentationAttributes-TextElements"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attribute name="clipPathUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="maskType">
        <xs:sequence>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="desc"/>
                <xs:element ref="title"/>
                <xs:element ref="metadata"/>
                <xs:element ref="defs"/>
                <xs:element ref="path"/>
                <xs:element ref="text"/>
                <xs:element ref="rect"/>
                <xs:element ref="circle"/>
                <xs:element ref="ellipse"/>
                <xs:element ref="line"/>
                <xs:element ref="polyline"/>
                <xs:element ref="polygon"/>
                <xs:element ref="use"/>
                <xs:element ref="image"/>
                <xs:element ref="svg"/>
                <xs:element ref="g"/>
                <xs:element ref="view"/>
                <xs:element ref="switch"/>
                <xs:element ref="a"/>
                <xs:element ref="altGlyphDef"/>
                <xs:element ref="script"/>
                <xs:element ref="style"/>
                <xs:element ref="symbol"/>
                <xs:element ref="marker"/>
                <xs:element ref="clipPath"/>
                <xs:element ref="mask"/>
                <xs:element ref="linearGradient"/>
                <xs:element ref="radialGradient"/>
                <xs:element ref="pattern"/>
                <xs:element ref="filter"/>
                <xs:element ref="cursor"/>
                <xs:element ref="font"/>
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateMotion"/>
                <xs:element ref="animateColor"/>
                <xs:element ref="animateTransform"/>
                <xs:element ref="color-profile"/>
                <xs:element ref="font-face"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attribute name="maskUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType"/>
        <xs:attribute name="height" type="LengthType"/>
    </xs:complexType>
    <xs:complexType name="filterType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="feBlend"/>
                <xs:element ref="feFlood"/>
                <xs:element ref="feColorMatrix"/>
                <xs:element ref="feComponentTransfer"/>
                <xs:element ref="feComposite"/>
                <xs:element ref="feConvolveMatrix"/>
                <xs:element ref="feDiffuseLighting"/>
                <xs:element ref="feDisplacementMap"/>
                <xs:element ref="feGaussianBlur"/>
                <xs:element ref="feImage"/>
                <xs:element ref="feMerge"/>
                <xs:element ref="feMorphology"/>
                <xs:element ref="feOffset"/>
                <xs:element ref="feSpecularLighting"/>
                <xs:element ref="feTile"/>
                <xs:element ref="feTurbulence"/>
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="filterUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="primitiveUnits">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="userSpaceOnUse"/>
                    <xs:enumeration value="userSpace"/>
                    <xs:enumeration value="objectBoundingBox"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType"/>
        <xs:attribute name="height" type="LengthType"/>
        <xs:attribute name="filterRes" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="feDistantLightType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="azimuth" type="xs:double"/>
        <xs:attribute name="elevation" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="fePointLightType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="x" type="xs:double"/>
        <xs:attribute name="y" type="xs:double"/>
        <xs:attribute name="z" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="feSpotLightType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="x" type="xs:double"/>
        <xs:attribute name="y" type="xs:double"/>
        <xs:attribute name="z" type="xs:double"/>
        <xs:attribute name="pointsAtX" type="xs:double"/>
        <xs:attribute name="pointsAtY" type="xs:double"/>
        <xs:attribute name="pointsAtZ" type="xs:double"/>
        <xs:attribute name="specularExponent" type="xs:double"/>
        <xs:attribute name="limitingConeAngle" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="feBlendType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="in2" type="xs:string" use="required"/>
        <xs:attribute name="mode" default="normal">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="normal"/>
                    <xs:enumeration value="multiply"/>
                    <xs:enumeration value="screen"/>
                    <xs:enumeration value="darken"/>
                    <xs:enumeration value="lighten"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="feColorMatrixType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="type" default="matrix">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="matrix"/>
                    <xs:enumeration value="saturate"/>
                    <xs:enumeration value="hueRotate"/>
                    <xs:enumeration value="luminanceToAlpha"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="values" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="feComponentTransferType">
        <xs:sequence>
            <xs:element ref="feFuncR" minOccurs="0"/>
            <xs:element ref="feFuncG" minOccurs="0"/>
            <xs:element ref="feFuncB" minOccurs="0"/>
            <xs:element ref="feFuncA" minOccurs="0"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
    </xs:complexType>
    <xs:complexType name="feFuncRType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="type2" use="required">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="identity"/>
                    <xs:enumeration value="table"/>
                    <xs:enumeration value="discrete"/>
                    <xs:enumeration value="linear"/>
                    <xs:enumeration value="gamma"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attributeGroup ref="component_transfer_function_attributes"/>
    </xs:complexType>
    <xs:complexType name="feFuncGType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="type2" use="required">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="identity"/>
                    <xs:enumeration value="table"/>
                    <xs:enumeration value="discrete"/>
                    <xs:enumeration value="linear"/>
                    <xs:enumeration value="gamma"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attributeGroup ref="component_transfer_function_attributes"/>
    </xs:complexType>
    <xs:complexType name="feFuncBType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="type2" use="required">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="identity"/>
                    <xs:enumeration value="table"/>
                    <xs:enumeration value="discrete"/>
                    <xs:enumeration value="linear"/>
                    <xs:enumeration value="gamma"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attributeGroup ref="component_transfer_function_attributes"/>
    </xs:complexType>
    <xs:complexType name="feFuncAType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="type3" use="required">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="identity"/>
                    <xs:enumeration value="table"/>
                    <xs:enumeration value="discrete"/>
                    <xs:enumeration value="linear"/>
                    <xs:enumeration value="gamma"/>
                </xs:restriction>
            </xs:simpleType>
            <!-- these all need to be stripped out and checked -->
        </xs:attribute>
        <xs:attributeGroup ref="component_transfer_function_attributes"/>
    </xs:complexType>
    <xs:complexType name="feCompositeType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="in2" type="xs:string" use="required"/>
        <xs:attribute name="operator" default="over">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="over"/>
                    <xs:enumeration value="in"/>
                    <xs:enumeration value="out"/>
                    <xs:enumeration value="atop"/>
                    <xs:enumeration value="xor"/>
                    <xs:enumeration value="arithmetic"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="k1" type="xs:double"/>
        <xs:attribute name="k2" type="xs:double"/>
        <xs:attribute name="k3" type="xs:double"/>
        <xs:attribute name="k4" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="feConvolveMatrixType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="order" type="xs:string" use="required"/>
        <xs:attribute name="kernelMatrix" type="xs:string" use="required"/>
        <xs:attribute name="divisor" type="xs:double"/>
        <xs:attribute name="bias" type="xs:double"/>
        <xs:attribute name="targetX" type="xs:integer"/>
        <xs:attribute name="targetY" type="xs:integer"/>
        <xs:attribute name="edgeMode" default="duplicate">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="duplicate"/>
                    <xs:enumeration value="wrap"/>
                    <xs:enumeration value="none"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="kernelUnitLength" type="xs:string"/>
        <xs:attribute name="preserveAlpha" type="xs:boolean"/>
    </xs:complexType>
    <xs:complexType name="feDiffuseLightingType">
        <xs:sequence>
            <xs:choice>
                <xs:element ref="feDistantLight"/>
                <xs:element ref="fePointLight"/>
                <xs:element ref="feSpotLight"/>
            </xs:choice>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateColor"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-LightingEffects"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="surfaceScale" type="xs:double"/>
        <xs:attribute name="diffuseConstant" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="feDisplacementMapType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="in2" type="xs:string" use="required"/>
        <xs:attribute name="scale" type="xs:double"/>
        <xs:attribute name="xChannelSelector" default="A">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="R"/>
                    <xs:enumeration value="G"/>
                    <xs:enumeration value="B"/>
                    <xs:enumeration value="A"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="yChannelSelector" default="A">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="R"/>
                    <xs:enumeration value="G"/>
                    <xs:enumeration value="B"/>
                    <xs:enumeration value="A"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="feFloodType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateColor"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-feFlood"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
    </xs:complexType>
    <xs:complexType name="feGaussianBlurType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="stdDeviation" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="feImageType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateTransform"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="filter_primitive_attributes"/>
    </xs:complexType>
    <xs:complexType name="feMergeType">
        <xs:sequence minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="feMergeNode"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes"/>
    </xs:complexType>
    <xs:complexType name="feMergeNodeType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="in" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="feMorphologyType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="operator" default="erode">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="erode"/>
                    <xs:enumeration value="dilate"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="radius" type="LengthType"/>
    </xs:complexType>
    <xs:complexType name="feOffsetType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="dx" type="LengthType"/>
        <xs:attribute name="dy" type="LengthType"/>
    </xs:complexType>
    <xs:complexType name="feSpecularLightingType">
        <xs:sequence>
            <xs:choice>
                <xs:element ref="feDistantLight"/>
                <xs:element ref="fePointLight"/>
                <xs:element ref="feSpotLight"/>
            </xs:choice>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="animate"/>
                <xs:element ref="set"/>
                <xs:element ref="animateColor"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-LightingEffects"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
        <xs:attribute name="surfaceScale" type="xs:double"/>
        <xs:attribute name="specularConstant" type="xs:double"/>
        <xs:attribute name="specularExponent" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="feTileType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes_with_in"/>
    </xs:complexType>
    <xs:complexType name="feTurbulenceType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="filter_primitive_attributes"/>
        <xs:attribute name="baseFrequency" type="xs:string"/>
        <xs:attribute name="numOctaves" type="xs:integer"/>
        <xs:attribute name="seed" type="xs:double"/>
        <xs:attribute name="stitchTiles" default="noStitch">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="stitch"/>
                    <xs:enumeration value="noStitch"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="type" default="turbulence">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="fractalNoise"/>
                    <xs:enumeration value="turbulence"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="cursorType">
        <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
    </xs:complexType>
    <xs:complexType name="aType" mixed="true">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute ref="xlink:type" fixed="simple"/>
        <xs:attribute ref="xlink:role"/>
        <xs:attribute ref="xlink:arcrole"/>
        <xs:attribute ref="xlink:title"/>
        <xs:attribute ref="xlink:show"/>
        <xs:attribute ref="xlink:actuate" fixed="onRequest"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="target" type="xs:NMTOKEN"/>
        <!-- don't use attribute declarations to declare namespaces

		attribute ref="xmlns:xlink" type="xs:string" fixed="http://www.w3.org/1999/xlink"/>

		-->
        <!-- change from string to URI -->
    </xs:complexType>
    <xs:complexType name="viewType">
        <xs:group ref="descTitleMetadata" minOccurs="0"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="viewBox" type="ViewBoxSpecType"/>
        <xs:attribute name="preserveAspectRatio" type="PreserveAspectRatioSpecType" default="xMidYMid meet"/>
        <xs:attribute name="zoomAndPan" default="magnify">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="disable"/>
                    <xs:enumeration value="magnify"/>
                    <xs:enumeration value="zoom"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
        <xs:attribute name="viewTarget" type="xs:string"/>
        <!--  xs:pattern: XML_NAME+    -->
        <!-- XML_NAME is a string containing the legal chars in XML 1.0 for attribute and content values -->
    </xs:complexType>
    <xs:complexType name="scriptType" mixed="true">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="type" type="ContentTypeType" use="required"/>
    </xs:complexType>
    <xs:complexType name="animateType">
        <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attributeGroup ref="animationEvents"/>
        <xs:attributeGroup ref="animTargetAttrs"/>
        <xs:attributeGroup ref="animTimingAttrs"/>
        <xs:attributeGroup ref="animValueAttrs"/>
        <xs:attributeGroup ref="animAdditionAttrs"/>
    </xs:complexType>
    <xs:complexType name="setType">
        <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attributeGroup ref="animationEvents"/>
        <xs:attributeGroup ref="animTargetAttrs"/>
        <xs:attributeGroup ref="animTimingAttrs"/>
        <xs:attribute name="to" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="animateMotionType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:element ref="mpath" minOccurs="0"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attributeGroup ref="animationEvents"/>
        <xs:attributeGroup ref="animElementAttrs"/>
        <xs:attributeGroup ref="animTimingAttrs"/>
        <xs:attributeGroup ref="animValueAttrs"/>
        <xs:attributeGroup ref="animAdditionAttrs"/>
        <xs:attribute name="path" type="xs:string"/>
        <xs:attribute name="keyPoints" type="xs:string"/>
        <xs:attribute name="rotate" type="xs:string"/>
        <xs:attribute name="origin" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="mpathType">
        <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
    </xs:complexType>
    <xs:complexType name="animateColorType">
        <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attributeGroup ref="animationEvents"/>
        <xs:attributeGroup ref="animTargetAttrs"/>
        <xs:attributeGroup ref="animTimingAttrs"/>
        <xs:attributeGroup ref="animValueAttrs"/>
        <xs:attributeGroup ref="animAdditionAttrs"/>
    </xs:complexType>
    <xs:complexType name="animateTransformType">
        <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attributeGroup ref="animationEvents"/>
        <xs:attributeGroup ref="animTargetAttrs"/>
        <xs:attributeGroup ref="animTimingAttrs"/>
        <xs:attributeGroup ref="animValueAttrs"/>
        <xs:attributeGroup ref="animAdditionAttrs"/>
        <xs:attribute name="type" default="translate">
            <xs:simpleType>
                <xs:restriction base="xs:string">
                    <xs:enumeration value="translate"/>
                    <xs:enumeration value="scale"/>
                    <xs:enumeration value="rotate"/>
                    <xs:enumeration value="skewX"/>
                    <xs:enumeration value="skewY"/>
                </xs:restriction>
            </xs:simpleType>
        </xs:attribute>
    </xs:complexType>
    <xs:complexType name="fontType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:element ref="font-face"/>
            <xs:element ref="missing-glyph"/>
            <xs:choice minOccurs="0" maxOccurs="unbounded">
                <xs:element ref="glyph"/>
                <xs:element ref="hkern"/>
                <xs:element ref="vkern"/>
            </xs:choice>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="horiz-origin-x" type="xs:double"/>
        <xs:attribute name="horiz-origin-y" type="xs:double"/>
        <xs:attribute name="horiz-adv-x" type="xs:double" use="required"/>
        <xs:attribute name="vert-origin-x" type="xs:double"/>
        <xs:attribute name="vert-origin-y" type="xs:double"/>
        <xs:attribute name="vert-adv-y" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="glyphType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="unicode" type="xs:string"/>
        <xs:attribute name="glyph-name" type="xs:string"/>
        <xs:attribute name="d" type="PathDataType"/>
        <xs:attribute name="vert-text-orient" type="xs:string"/>
        <xs:attribute name="arabic" type="xs:string"/>
        <xs:attribute name="han" type="xs:string"/>
        <xs:attribute name="horiz-adv-x" type="xs:double"/>
        <xs:attribute name="vert-adv-y" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="missing-glyphType">
        <xs:choice minOccurs="0" maxOccurs="unbounded">
            <xs:element ref="desc"/>
            <xs:element ref="title"/>
            <xs:element ref="metadata"/>
            <xs:element ref="defs"/>
            <xs:element ref="path"/>
            <xs:element ref="text"/>
            <xs:element ref="rect"/>
            <xs:element ref="circle"/>
            <xs:element ref="ellipse"/>
            <xs:element ref="line"/>
            <xs:element ref="polyline"/>
            <xs:element ref="polygon"/>
            <xs:element ref="use"/>
            <xs:element ref="image"/>
            <xs:element ref="svg"/>
            <xs:element ref="g"/>
            <xs:element ref="view"/>
            <xs:element ref="switch"/>
            <xs:element ref="a"/>
            <xs:element ref="altGlyphDef"/>
            <xs:element ref="script"/>
            <xs:element ref="style"/>
            <xs:element ref="symbol"/>
            <xs:element ref="marker"/>
            <xs:element ref="clipPath"/>
            <xs:element ref="mask"/>
            <xs:element ref="linearGradient"/>
            <xs:element ref="radialGradient"/>
            <xs:element ref="pattern"/>
            <xs:element ref="filter"/>
            <xs:element ref="cursor"/>
            <xs:element ref="font"/>
            <xs:element ref="animate"/>
            <xs:element ref="set"/>
            <xs:element ref="animateMotion"/>
            <xs:element ref="animateColor"/>
            <xs:element ref="animateTransform"/>
            <xs:element ref="color-profile"/>
            <xs:element ref="font-face"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="d" type="PathDataType"/>
        <xs:attribute name="horiz-adv-x" type="xs:double"/>
        <xs:attribute name="vert-adv-y" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="hkernType">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="u1" type="xs:string"/>
        <xs:attribute name="g1" type="xs:string"/>
        <xs:attribute name="u2" type="xs:string"/>
        <xs:attribute name="g2" type="xs:string"/>
        <xs:attribute name="k" type="xs:double" use="required"/>
    </xs:complexType>
    <xs:complexType name="vkernType">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="u1" type="xs:string"/>
        <xs:attribute name="g1" type="xs:string"/>
        <xs:attribute name="u2" type="xs:string"/>
        <xs:attribute name="g2" type="xs:string"/>
        <xs:attribute name="k" type="xs:double" use="required"/>
    </xs:complexType>
    <xs:complexType name="font-faceType">
        <xs:sequence>
            <xs:group ref="descTitleMetadata" minOccurs="0" maxOccurs="3"/>
            <xs:element ref="font-face-src"/>
            <xs:element ref="definition-src"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="font-family" type="FontFamilyValueType"/>
        <xs:attribute name="font-style" type="xs:string"/>
        <xs:attribute name="font-variant" type="xs:string"/>
        <xs:attribute name="font-weight" type="xs:string"/>
        <xs:attribute name="font-stretch" type="xs:string"/>
        <xs:attribute name="font-size" type="FontSizeValueType"/>
        <xs:attribute name="unicode-range" type="xs:string"/>
        <xs:attribute name="units-per-em" type="xs:double"/>
        <xs:attribute name="panose-1" type="xs:string"/>
        <xs:attribute name="stemv" type="xs:double"/>
        <xs:attribute name="stemh" type="xs:double"/>
        <xs:attribute name="slope" type="xs:double"/>
        <xs:attribute name="cap-height" type="xs:double"/>
        <xs:attribute name="x-height" type="xs:double"/>
        <xs:attribute name="accent-height" type="xs:double"/>
        <xs:attribute name="ascent" type="xs:double"/>
        <xs:attribute name="descent" type="xs:double"/>
        <xs:attribute name="widths" type="xs:string"/>
        <xs:attribute name="bbox" type="xs:string"/>
        <xs:attribute name="ideographic" type="xs:double"/>
        <xs:attribute name="baseline" type="xs:double"/>
        <xs:attribute name="centerline" type="xs:double"/>
        <xs:attribute name="mathline" type="xs:double"/>
        <xs:attribute name="hanging" type="xs:double"/>
        <xs:attribute name="topline" type="xs:double"/>
        <xs:attribute name="underline-position" type="xs:double"/>
        <xs:attribute name="underline-thickness" type="xs:double"/>
        <xs:attribute name="strikethrough-position" type="xs:double"/>
        <xs:attribute name="strikethrough-thickness" type="xs:double"/>
        <xs:attribute name="overline-position" type="xs:double"/>
        <xs:attribute name="overline-thickness" type="xs:double"/>
    </xs:complexType>
    <xs:complexType name="font-face-srcType">
        <xs:choice maxOccurs="unbounded">
            <xs:element ref="font-face-uri"/>
            <xs:element ref="font-face-name"/>
        </xs:choice>
        <xs:attributeGroup ref="stdAttrs"/>
    </xs:complexType>
    <xs:complexType name="font-face-uriType">
        <xs:sequence>
            <xs:element ref="font-face-format"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
    </xs:complexType>
    <xs:complexType name="font-face-formatType">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="string" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="font-face-nameType">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attribute name="name" type="xs:string"/>
    </xs:complexType>
    <xs:complexType name="definition-srcType">
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="xlinkRefAttrs"/>
        <xs:attribute ref="xlink:href"/>
    </xs:complexType>
    <xs:complexType name="metadataType" mixed="true">
        <xs:sequence minOccurs="0" maxOccurs="unbounded">
            <xs:any namespace="##other"/>
        </xs:sequence>
        <xs:attributeGroup ref="stdAttrs"/>
    </xs:complexType>
    <xs:complexType name="foreignObjectType" mixed="true">
        <xs:sequence minOccurs="0" maxOccurs="unbounded"/>
        <xs:attributeGroup ref="stdAttrs"/>
        <xs:attributeGroup ref="testAttrs"/>
        <xs:attributeGroup ref="langSpaceAttrs"/>
        <xs:attribute name="externalResourcesRequired" type="xs:boolean"/>
        <xs:attribute name="class" type="ClassListType"/>
        <xs:attribute name="style" type="StyleSheetType"/>
        <xs:attributeGroup ref="PresentationAttributes-All"/>
        <xs:attribute name="transform" type="TransformListType"/>
        <xs:attributeGroup ref="graphicsElementEvents"/>
        <xs:attribute name="x" type="CoordinateType"/>
        <xs:attribute name="y" type="CoordinateType"/>
        <xs:attribute name="width" type="LengthType" use="required"/>
        <xs:attribute name="height" type="LengthType" use="required"/>
        <xs:attribute name="content" type="xs:string" fixed="structured text"/>
    </xs:complexType>
</xs:schema>
`.replace(/xs\:/g, ''); // remove 'xs:' prefix for easier navigation later

function stringToXml(text) {
    var xmlDoc;
    if (window.DOMParser) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, 'text/xml');
    }
    else {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.loadXML(text);
    }
    return xmlDoc;
}

var schemaNode = stringToXml(xmlSchemaString).childNodes[0];