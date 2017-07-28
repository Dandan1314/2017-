QUnit.module( "Module a" );
QUnit.test( "a basic test example", function( assert ) {
    assert.ok( 1==='1', "this test is fine" );
});
QUnit.test( "a basic test example 2", function( assert ) {
    assert.ok( true, "this test is fine" );
});

QUnit.module( "Module b" );
QUnit.test( "a basic test example 3", function( assert ) {
    assert.ok( true, "this test is fine" );
});
QUnit.test( "a basic test example 4", function(assert) {
    assert.ok( true, "this test is fine" );
});